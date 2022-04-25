<template>
  <section class="home">
    <div>
      <h1>Hajun's Home Page!</h1>
      <h2><router-link to="/about">About</router-link></h2>
      <h2><router-link to="/todos">Todo App</router-link></h2>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
</style>
