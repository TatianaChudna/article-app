<template>
  <div
      v-for="article in articleList"
      :key="article.id"
  >
    <ArticleItem
        :article="article"
    />
  </div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem.vue";

export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    articleList: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped>
</style>
