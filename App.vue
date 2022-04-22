<template>
  <todo-app />
</template>

<script>
import TodoApp from './components/TodoApp';
export default {
  components: {
    TodoApp,
  },
};
</script>

<style scoped lang="scss">
$color: blue;

h1 {
  color: $color;
  display: flex;
}
</style>
