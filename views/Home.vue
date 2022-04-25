<template>
  <section class="home">
    <div>
      <h1>Hajun's Home Page!</h1>
      <h2><a @click.prevent="toAbout">About</a></h2>
      <h2><a @click.prevent="toTodoApp">Todo App</a></h2>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    toAbout() {
      this.$router.push('/about');
    },
    toTodoApp() {
      this.$router.push('/todos');
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
</style>
