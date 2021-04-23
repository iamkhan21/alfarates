<template>
  <header class="header" role="navigation" aria-label="main navigation">
    <NuxtLink to="/">
      <img class="logo" src="~/assets/imgs/svg/logo.svg" />
    </NuxtLink>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  padding: 10px 0;
  background-color: transparent;
  z-index: 1;
}

.logo {
  max-height: 64px;
}
</style>
