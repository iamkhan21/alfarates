<template>
  <fragment>
    <Header />
    <main>
      <Nuxt />
    </main>
    <Footer />
  </fragment>
</template>

<script>
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default {
  components: { Header, Footer },
};
</script>
