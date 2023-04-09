<template>
<div class="article-size">
  <div class="image" :style="{ backgroundImage: `url(${article.images[0].landscape[1]})` }"></div>
  <div class="info">
    <div class="avatar-container">
      <div class="avatar"><span>{{ avatarName }}</span></div>
      <div>
        <p class="author"><b>{{article.author}}</b></p>
        <p class="date">{{this.newDateFormat}}</p>
      </div>
    </div>
    <h3 class="title">{{ article.title }}</h3>
    <div class="like-box">
      <button class="like-button" :class="[checked ? activeClass : notActiveClass]" @click="likeFunction">Like</button>
      <div class="like-container">
        <img src="../assets/heart-icon.svg" alt="heart-icon">
        <span class="like">{{ countLikes }} likes</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      newDateFormat: '',
      checked: false,
      countLikes: this.article.likes,
      activeClass: 'active',
      notActiveClass: 'not-active',
      avatarName: '',
    };
  },

  mounted() {
    const moment = require('moment');
    const d = new Date(this.article.dateAdded);
    this.newDateFormat = moment(d).format('MMM DD');

    this.avatarName = this.article.author.match(/\b(\w)/g).join('').toUpperCase();
  },

  methods: {
    likeFunction() {
      this.checked = !this.checked;
      this.checked ? this.countLikes++ : this.countLikes--;
    },
  }
}

</script>

<style scoped>
.article-size {
  height: 300px;
  background: #FFF;
  border-radius: 6px;
}
.like-box {
  display: flex;
  justify-content: space-between;
}
.info {
  height: 180px;
  padding: 19px;
}
.avatar-container {
  display: flex;
  justify-content: flex-start;
 }
.avatar-container .author {
  margin-bottom: 0;
  margin-top: 4px;
  font-size: 14px;
}
.avatar {
  width: 40px;
  background: #0D81B3;
  border-radius: 50%;
  height: 40px;
  margin-right: 5px;
}
.avatar span {
  text-align: center;
  display: block;
  color: #FFFFFF;
  padding-top: 11px;
}
.date {
  color: #888888;
  font-size: 10px;
  margin: 2px 0 0;
}
.image {
  height: 120px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 6px 6px 0 0;
}
.title {
  min-height: 45px;
  margin-bottom: 10px;
}
.like-container {
  display: flex;
  align-items: center;
}
.like-button {
  width: 70px;
  padding: 6px 4px 4px;
  border-radius: 6px;
  font-size: 16px;
  text-transform: uppercase;
  border: 2px solid #00A4E0;
  cursor: pointer;
}
.not-active {
  background: #fff;
  color: #00A4E0;
}
.active {
  color: #FFF;
  background: #00A4E0;
}
.like {
  color: #888888;
  font-size: 13px;
  margin-left: 5px;
}
</style>
