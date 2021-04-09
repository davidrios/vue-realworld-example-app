import { FluentBundle, FluentResource } from "@fluent/bundle";
import { negotiateLanguages } from "@fluent/langneg";
import { createFluentVue } from "fluent-vue";

const DEFAULT_LOCALE = "en-US";
const SUPPORTED_LOCALES = ["en-US", "pt-BR"];

function getDesiredLocales(maxLanguages) {
  const desired = negotiateLanguages(navigator.languages, SUPPORTED_LOCALES, {
    defaultLocale: DEFAULT_LOCALE,
    strategy: "matching"
  });

  const allowed = [];
  let previous = null;
  let count = -1;
  for (const locale of desired) {
    const lang = locale.substr(0, 2);

    if (previous != lang) {
      previous = lang;
      count += 1;
    }

    if (count >= maxLanguages) {
      break;
    }

    allowed.push(locale);
  }

  if (!allowed.includes(DEFAULT_LOCALE)) {
    allowed.push(DEFAULT_LOCALE);
  }

  return allowed;
}

async function loadCatalog(locale, catalogName) {
  try {
    const { default: contents } = await import(
      `../locales/${locale}/${catalogName}.ftl`
    );
    return contents;
  } catch (err) {
    console.warn(`Could not load catalog ${locale}/${catalogName}`);
    return "";
  }
}

async function loadAndCreateFluentVue(maxLanguages = 1) {
  return Promise.all(
    getDesiredLocales(maxLanguages).map(locale =>
      loadCatalog(locale, "global").then(data => ({ locale, data }))
    )
  ).then(catalogsData => {
    const bundles = catalogsData.map(({ locale, data }) => {
      const bundle = new FluentBundle(locale);
      const errors = bundle.addResource(new FluentResource(data));

      if (errors.length > 0) {
        console.warn(`Errors loading fluent resource ${locale}/global`, errors);
      }

      return bundle;
    });

    return createFluentVue({
      locale: catalogsData.map(({ locale }) => locale),
      bundles: bundles
    });
  });
}

export { DEFAULT_LOCALE, SUPPORTED_LOCALES, loadAndCreateFluentVue };
