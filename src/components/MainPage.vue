<template>
    <MainHeader />
    <MainContent />
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import MainContent from "@/components/MainContent.vue";

export default {
  name: 'MainPage',
  components: {
    MainContent,
    MainHeader,
  },
  props: {
  }
}
</script>

<style scoped>
</style>
