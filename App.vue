<template>
  <div>
    <router-link to="/" class="to-home">홈으로</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$router);
    console.log(this.$route);
  },
};
</script>

<style lang="scss" scoped>
.to-home.router-link-exact-active {
  display: none;
}
</style>
