<template>
  <footer>
    <div class="container">
      <router-link class="logo-font" :to="{ name: 'home', params: {} }">
        {{ $t("app-name") }}
      </router-link>
      <i18n path="footer-text" use-ta tag="span" class="attribution">
        <template #linkToCompany="{ companyName, companyWebsite }">
          <a rel="noopener noreferrer" target="blank" :href="companyWebsite">{{
            companyName
          }}</a>
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
