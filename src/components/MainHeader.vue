<template>
<div class="header">
  <div class="header-box">
    <h1>dev articles</h1>
  </div>
</div>
</template>

<script>
export default {
  name: 'MainHeader',
  props: {
  }
}
</script>

<style scoped>
.header {
  height: 200px;
  color: #EEE;
  background-color: #0D81B3;
}
.header-box {
  max-width: 920px;
  margin: 0 auto;
}
h1 {
  margin: 0;
  padding-top: 81px;
  font-size: 28px;
}
@media only screen and  (max-width: 1024px)  {
  .header-box {
    padding-left: 20px;
    box-sizing: border-box;
  }
}
</style>
