<template>
  <footer>
    <div class="container">
      {{ $t("app-name") }}
      <router-link class="logo-font" :to="{ name: 'home', params: {} }">
        {{ $t("app-name") }}
      </router-link>
      <i18n path="footer-text" tag="span" class="attribution">
        <template #linkToCompany>
          <a
            rel="noopener noreferrer"
            target="blank"
            :href="$t('company-website')"
            >{{ $t("company-name") }}</a
          >
        </template>
      </i18n>
    </div>
  </footer>
</template>

<script>
export default {
  name: "RwvFooter"
};
</script>
