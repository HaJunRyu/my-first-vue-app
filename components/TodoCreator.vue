<template>
  <div>
    <button @click="createTodo">추가</button>
    <input
      :value="title"
      :placeholder="placeholder"
      type="text"
      @input="title = $event.target.value"
      @keypress.enter="createTodo"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      placeholder: '할 일을 추가하세요',
    };
  },
  methods: {
    createTodo() {
      const validatedTitle = this.title && this.title.trim();

      if (!validatedTitle) {
        this.title = this.title.trim();
        return;
      }

      this.$emit('create-todo', this.title);
      this.title = '';
    },
  },
};
</script>
