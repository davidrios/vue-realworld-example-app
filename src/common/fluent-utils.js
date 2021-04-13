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

class FluentManager {
  constructor(storageName = "default") {
    let chosenLocale = localStorage.getItem(`fluentManager.${storageName}`);
    if (chosenLocale == null) {
      chosenLocale = navigator.languages;
    } else {
      chosenLocale = [chosenLocale];
    }

    this.storageName = storageName;
    this.locales = getLocalesToLoad(chosenLocale);
    this.fluent = createFluentVue({ locale: this.locales });
    this.plugin = localePlugin(this);
    this.loadedCatalogs = {};
  }

  get currentLocale() {
    return this.fluent.locale[0];
  }

  async init(catalog = "global") {
    return await this.loadCatalog(catalog);
  }

  async loadCatalog(catalog, refresh = true) {
    if (this.loadedCatalogs[catalog] == null) {
      this.loadedCatalogs[catalog] = {};
    }

    await Promise.all(
      this.locales.map(async locale => {
        let res = null;

        try {
          res = (await import(`@/locales/${locale}/${catalog}.ftl`)).default;
        } catch (err) {
          console.warn(`Could not load catalog ${locale}/${catalog}`);
          return;
        }

        if (res == null) {
          return;
        }

        const callback = async (url, refresh = true) => {
          if (this.loadedCatalogs[catalog][locale] == null || refresh) {
            const req = await fetch(url);

            if (req.ok) {
              this.loadedCatalogs[catalog][locale] = await req.text();
            }
          }

          if (refresh) {
            this.refresh();
          }
        };

        res.register(callback);
        await callback(res.content, false);
      })
    );

    if (refresh) {
      this.refresh();
    }
  }

  async changeLocale(newLocale) {
    this.locales = getLocalesToLoad([newLocale]);
    await this.loadAllCatalogs();
    localStorage.setItem(`fluentManager.${this.storageName}`, newLocale);
  }

  async loadAllCatalogs() {
    await Promise.all(
      Object.keys(this.loadedCatalogs).map(async catalog => {
        await this.loadCatalog(catalog, false);
      })
    );

    this.refresh();
  }

  refresh() {
    const bundles = [];
    const catalogs = [];

    for (const locale of this.locales) {
      const data = [];

      for (const catalog in this.loadedCatalogs) {
        data.push(this.loadedCatalogs[catalog][locale]);
        catalogs.push(catalog);
      }

      const bundle = new FluentBundle(locale);
      const errors = bundle.addResource(new FluentResource(data.join("\n")));

      bundles.push(bundle);

      if (errors.length > 0) {
        console.warn(
          `Errors loading fluent resource ${locale} with catalogs ${catalogs.join(
            ", "
          )}`,
          errors
        );
      }
    }

    this.fluent.bundles = bundles;
    this.fluent.locale = this.locales;
  }
}

async function loadAndCreateFluentVue() {
  const manager = new FluentManager();
  await manager.init();

  return {
    fluent: manager.fluent,
    localePlugin: manager.plugin
  };
}

function localePlugin(manager) {
  return {
    install(vue) {
      vue.prototype.$locale = {
        get current() {
          return manager.currentLocale;
        },
        set current(newLocale) {
          this.setCurrent(newLocale);
        },
        async setCurrent(newLocale) {
          return await manager.changeLocale(newLocale);
        },
        async useCatalog(catalogName) {
          return await manager.loadCatalog(catalogName);
        },
        get supported() {
          return SUPPORTED_LOCALES.slice();
        },
        parseDate(isoDate) {
          return new Date(isoDate);
        }
      };
    }
  };
}

export { loadAndCreateFluentVue };
