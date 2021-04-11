import { FluentBundle, FluentResource } from "@fluent/bundle";
import { negotiateLanguages } from "@fluent/langneg";
import { createFluentVue } from "fluent-vue";

const DEFAULT_LOCALE = "en-US";
const SUPPORTED_LOCALES = ["en-US", "pt-BR", "pt"];
const MAX_LANGUAGES = 1;

function getLocalesToLoad(desiredLocales) {
  const negotiated = negotiateLanguages(desiredLocales, SUPPORTED_LOCALES, {
    defaultLocale: DEFAULT_LOCALE,
    strategy: "filtering"
  });

  const toLoad = [];
  let previous = null;
  let count = -1;
  for (const locale of negotiated) {
    const lang = locale.substr(0, 2);

    if (previous != lang) {
      previous = lang;
      count += 1;
    }

    if (count >= MAX_LANGUAGES) {
      break;
    }

    toLoad.push(locale);
  }

  if (!toLoad.includes(DEFAULT_LOCALE)) {
    toLoad.push(DEFAULT_LOCALE);
  }

  return toLoad;
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

async function loadAndCreateBundles(locales, catalog = "global") {
  const catalogsData = await Promise.all(
    locales.map(locale =>
      loadCatalog(locale, catalog).then(data => ({ locale, data }))
    )
  );

  return catalogsData.map(({ locale, data }) => {
    const bundle = new FluentBundle(locale);
    const errors = bundle.addResource(new FluentResource(data));

    if (errors.length > 0) {
      console.warn(`Errors loading fluent resource ${locale}/global`, errors);
    }

    return bundle;
  });
}

async function loadAndCreateFluentVue() {
  let chosenLocale = localStorage.getItem("chosenLocale");
  if (chosenLocale == null) {
    chosenLocale = navigator.languages;
  } else {
    chosenLocale = [chosenLocale];
  }
  const locales = getLocalesToLoad(chosenLocale);
  const bundles = await loadAndCreateBundles(locales);

  return createFluentVue({
    locale: locales,
    bundles: bundles
  });
}

function localePlugin(fluent) {
  return {
    install(vue) {
      vue.prototype.$locale = {
        get current() {
          return fluent.locale[0];
        },
        set current(newLocale) {
          this.setCurrent(newLocale);
        },
        async setCurrent(newLocale) {
          const locales = getLocalesToLoad([newLocale]);
          const bundles = await loadAndCreateBundles(locales);
          localStorage.setItem("chosenLocale", newLocale);
          fluent.bundles = bundles;
          fluent.locale = locales;
        },
        get supported() {
          return SUPPORTED_LOCALES.slice();
        }
      };
    }
  };
}

export { loadAndCreateFluentVue, localePlugin };
