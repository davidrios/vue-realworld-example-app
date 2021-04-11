<template>
  <footer>
    <div class="container">
      <router-link class="logo-font" :to="{ name: 'home', params: {} }">
        {{ $t("app-name") }}
      </router-link>
      <!-- eslint-disable-next-line --><!-- it was going crazy -->
      <i18n path="footer-text" use-ta tag="span" class="attribution">
        <template #linkToCompany="{ companyName, companyWebsite }">
          <a rel="noopener noreferrer" target="blank" :href="companyWebsite">{{
            companyName
          }}</a>
        </template>
      </i18n>
      <div class="lang-select">
        <label
          ><span class="attribution">Locale</span>
          <select
            class="form-control-sm"
            v-model="currentLocale"
            :disabled="localeLoading"
          >
            <option v-for="locale in supportedLocales" :key="locale">{{
              locale
            }}</option>
          </select>
        </label>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
}
.lang-select {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;

  label {
    margin: 0;
  }

  select {
    margin-left: 5px;
    padding: 3px;
  }
}
</style>

<script>
export default {
  name: "RwvFooter",
  computed: {
    supportedLocales() {
      return this.$locale.supported;
    },
    currentLocale: {
      get() {
        return this.$locale.current;
      },
      async set(value) {
        this.localeLoading = true;
        await this.$locale.setCurrent(value);
        this.localeLoading = false;
      }
    }
  },
  data() {
    return {
      localeLoading: false
    };
  }
};
</script>
