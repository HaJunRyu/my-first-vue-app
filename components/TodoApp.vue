<template>
  <div>
    <todo-item />
    <todo-creator @create-todo="createTodo" />
  </div>
</template>

<script>
import lowdb from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import TodoCreator from './TodoCreator';
import TodoItem from './TodoItem';

export default {
  components: {
    TodoCreator,
    TodoItem,
  },
  data() {
    return {
      db: null,
    };
  },
  created() {
    this.initDB();
  },
  methods: {
    initDB() {
      const adapter = new LocalStorage('todo-app');
      this.db = lowdb(adapter);

      this.db
        .defaults({
          todos: [],
        })
        .write();
    },
    createTodo(title) {
      const currentDate = new Date();
      const prevTodos = this.db.get('todos').value();

      const newId = prevTodos.length === 0 ? 0 : Math.max(...prevTodos.map(({ id }) => id)) + 1;

      const newTodo = {
        id: newId,
        title,
        createdAt: currentDate,
        updatedAt: currentDate,
        done: false,
      };

      this.db.get('todos').push(newTodo).write();
    },
  },
};
</script>
