<template>
<div class="container">
  <div class="content">
    <div class="toolbar">
      <span class="filter">
        <img src="../assets/search-icon.svg" alt="search-icon">
        <input
            v-model="searchValue"
            type="text"
            name="filter"
            id="input-filter"
            placeholder="Filter by title, author..."
        >
      </span>
      <select
          :action="sort"
          v-model="selected"
          class="select-result"
      >
        <option
            disabled
            :value="1"
        >
          All Results
        </option>
        <option :value="2">By alphabet</option>
        <option :value="3">New first</option>
        <option :value="4">Old first</option>
      </select>
      <div  class="checkbox">
        <input
            id="input-check"
            type="checkbox"
            v-model="checked"
        >
        <label for="input-check">Latest only</label>
      </div>
    </div>
</div>
  <div
    class="grid-container">
    <ArticleList
      :article-list="filterArticles"
    />
  </div>
</div>
</template>

<script>
import ArticleList from "@/components/ArticleList.vue";
import axios from "axios";
const sortByAlphabet = 2;
const sortByDataEsc = 3;
const sortByDataDesc = 4;

export default {
  name: 'MainContent',
  components: {
    ArticleList,
  },
  props: {
  },

  data() {
    return {
      articleList: [],
      searchValue: '',
      selected: 1,
      checked: false,
    };
  },

  mounted() {
    axios.get('/api.json')
        .then(resp => {
          this.articleList = resp.data.payload.data;
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
        });
  },

  computed: {
    filterArticles() {
      let result = this.articleList
      if (this.checked) {
        result = this.articleList.filter((item) => {
          return item.dateAdded >= '2022-01-01';
        })
      }

      if (this.searchValue && this.searchValue.length > 1) {
        result = result.filter((item) => {
          return item.author
                  .toUpperCase()
                  .includes(this.searchValue.toUpperCase()) ||
              item.title
                  .toUpperCase()
                  .includes(this.searchValue.toUpperCase())
        })
      }
      return result
    },

    sort() {
      let sortedArticles = this.articleList;
      switch (this.selected) {
        case sortByAlphabet:
          sortedArticles.sort((a, b) => {
            let fa = a.author.toLowerCase(), fb = b.author.toLowerCase();
            if (fa < fb) {
              return -1
            }
            if (fa > fb) {
              return 1
            }
          })
          break;
        case sortByDataEsc:
          sortedArticles.sort((a, b) => {
            return new Date(b.dateAdded) - new Date(a.dateAdded);
          })
          break;
        case sortByDataDesc:
          sortedArticles.sort((a, b) => {
            return new Date(a.dateAdded) - new Date(b.dateAdded);
          })
          break;
      }
      return 0;
    },
  },

  methods: {}
}
</script>

<style scoped>
.container {
  margin: 0 auto 50px;
  max-width: 920px;
  padding: 0 20px;
}
.toolbar {
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  border-radius: 6px;
  height: 70px;
  margin-top: -35px;
  padding: 0 76px 0 33px;
}
.filter {
  display: flex;
  height: 30px;
  margin: auto 0;
  padding: 0 26px 0 0;
}
#input-filter {
  border: none;
  margin-left: 15px;
  font-size: 16px;
}
#input-filter:focus-visible {
  outline: none;
}
input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  font: 16px Avenir, Helvetica, Arial, sans-serif;
  color: #888888;
  opacity: 1; /* Firefox */
}
.checkbox {
  margin: auto 0;
  display: flex;
  align-items: center;
}
input[type="checkbox"] {
  accent-color: #0D81B3;
  background-color: #EEE;
  /*-moz-appearance: none;*/
  /*-webkit-appearance: none;*/
  width: 20px;
  height: 20px;
}
label {
  color: #888888;
  margin-left: 7px;
}
.select-result {
  color: #888888;
  font-size: 16px;
  border: none;
  outline: none;
}
.grid-container {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 50px;
}
@media (prefers-color-scheme: light) {
  #input-check {
    accent-color: black;
  }
}
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .toolbar {
    padding: 0 65px 0 40px;
  }
  .filter {
    padding: 0;
  }
}
@media only screen and (min-width: 481px) and (max-width: 768px)  {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .toolbar {
    padding: 0 30px 0 25px;
    height: 70px;
    box-sizing: border-box;
  }
  .filter {
    padding: 0;
  }
  #input-filter {
    width: 150px;
  }
}

@media only screen and (max-width: 480px)  {
  .grid-container {
    display: grid;
    grid-template-columns: 1fr;
  }
  .toolbar {
    display: grid;
    grid-template-columns: 1fr;
    height: 170px;
    padding: 0 0 0 26px;
  }
  .filter {
    padding: 0;
  }
  .select-result {
    width: 110px;
  }
}
@media only screen and (max-width: 300px)  {
  #input-filter {
    width: 150px;
  }
}
</style>
