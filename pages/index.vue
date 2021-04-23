<template>
  <article class="article">
    <section class="jumbotron">
      <p>
        <b>Todayrate</b> is&nbsp;the place where you can get today Belarusian
        banks currency rate. We&nbsp;get rates data via the Alfa Bank API.
      </p>
      <p>The project itself is&nbsp;made on&nbsp;Nuxt.js.</p>
    </section>

    <Convertor :rates="data.rates" />
  </article>
</template>

<style scoped lang="scss">
.article {
  flex-grow: 1;

  @media (max-height: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

}

.jumbotron {
  margin: 25% 0 30px;
  font-size: 1.4rem;
  max-width: 550px;
  @media (max-height: 1000px) {
    margin-top: 0;
  }
}
</style>

<script>
import Convertor from "@/components/main-page/Convertor";

export default {
  components: {
    Convertor,
  },
  async asyncData({ $api }) {
    const data = await $api("bank", "rates");
    return { data };
  },
};
</script>
