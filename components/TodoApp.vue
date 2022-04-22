<template>
  <fragment>
    <todo-item></todo-item>
    <todo-creator></todo-creator>
  </fragment>
</template>

<script>
import TodoCreator from './TodoCreator.vue';
import TodoItem from './TodoItem.vue';

export default {
  components: {
    TodoCreator,
    TodoItem,
  },
};
</script>
