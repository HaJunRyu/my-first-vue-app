<template>
  <div>
    <todo-item />
    <todo-creator />
  </div>
</template>

<script>
import lowdb from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import cryptoRandomString from 'crypto-random-string';
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

      const newTodo = {
        id: cryptoRandomString({ length: 10 }),
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
