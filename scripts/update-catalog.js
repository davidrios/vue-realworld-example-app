const fs = require("fs");
const path = require("path");
const {
  parse,
  serialize,
  Resource,
  GroupComment,
  Comment
} = require("@fluent/syntax");

function updateCatalog(locale, catalogName, fromLocale) {
  if (fromLocale == null) {
    fromLocale = "en-US";
  }

  if (locale === "en-US") {
    console.error("Error: can't update main locale catalogs");
    process.exit(1);
  }

  const baseCatalogPath = path.resolve(
    "src/locales",
    fromLocale,
    catalogName + ".ftl"
  );
  const catalogPath = path.resolve("src/locales", locale, catalogName + ".ftl");

  const baseCatalog = parse(fs.readFileSync(baseCatalogPath).toString());

  const existingMessages = {};

  let catalog;
  try {
    catalog = parse(fs.readFileSync(catalogPath).toString());
  } catch {
    console.info("catalog does not exist, it will be created");
    fs.mkdirSync(path.dirname(catalogPath));
  }

  if (catalog != null) {
    for (const msg of catalog.body) {
      if (msg.type !== "Message") {
        continue;
      }

      existingMessages[msg.id.name] = msg;
    }
  }

  const usedKeys = {};
  const newResource = new Resource();
  for (const item of baseCatalog.body) {
    if (item.type !== "Message") {
      newResource.body.push(item);
      continue;
    }

    const existingMsg = existingMessages[item.id.name];

    if (existingMsg != null) {
      usedKeys[item.id.name] = true;
      if (existingMsg.comment != null) {
        if (
          item.comment != null &&
          existingMsg.comment.content !== item.comment.content
        ) {
          // try to merge comments

          const oldLines = existingMsg.comment.content
            .replace(item.comment.content + "\n", "")
            .split("\n");

          existingMsg.comment = new Comment(
            item.comment.content +
              "\n" +
              oldLines
                .map(line => {
                  if (line.startsWith("!!")) {
                    return line;
                  } else {
                    return "!! " + line;
                  }
                })
                .join("\n")
          );
        }
      } else {
        existingMsg.comment = item.comment;
      }
      newResource.body.push(existingMsg);
    } else {
      newResource.body.push(item);
    }
  }

  let addedComment = false;
  for (const key in existingMessages) {
    if (usedKeys[key]) {
      continue;
    }

    if (!addedComment) {
      newResource.body.push(
        new GroupComment("The keys bellow were not in the base catalog.")
      );
      addedComment = true;
    }

    newResource.body.push(existingMessages[key]);
  }

  let pathToSave = catalogPath;
  if (catalog != null) {
    pathToSave = pathToSave.replace(/\.ftl$/, "-updated.ftl");
  }

  fs.writeFileSync(pathToSave, serialize(newResource));
}

if (require.main === module) {
  if (process.argv.length < 4 || process.argv.length > 5) {
    console.log("usage: update-catalog.js LOCALE CATALOG_NAME [FROM_LOCALE]");
    process.exit(0);
  }
  updateCatalog(process.argv[2], process.argv[3], process.argv[4]);
}
