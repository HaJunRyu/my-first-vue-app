<template>
  <div>
    <todo-item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @update-todo="updateTodo"
      @delete-todo="deleteTodo"
      @edited-todo="editedTodo"
    />
    <hr />
    <todo-creator @create-todo="createTodo" />
  </div>
</template>

<script>
import lowdb from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import assign from 'lodash/assign';
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
      todos: [],
    };
  },
  created() {
    this.initDB();
  },
  methods: {
    initDB() {
      const adapter = new LocalStorage('todo-app');
      this.db = lowdb(adapter);

      const hasTodos = this.db.has('todos').value();

      if (hasTodos) {
        this.todos = cloneDeep(this.db.getState().todos);
      } else {
        this.db
          .defaults({
            todos: [],
          })
          .write();
      }
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

      this.todos.push(newTodo);
    },
    updateTodo(todo, updateValue) {
      this.db.get('todos').find({ id: todo.id }).assign(updateValue).write();

      const foundTodo = find(this.todos, { id: todo.id });
      assign(foundTodo, updateValue);
    },
    deleteTodo(todo) {
      this.db.get('todos').remove({ id: todo.id }).write();

      const foundIndex = this.todos.findIndex(({ id }) => id === todo.id);

      this.$delete(this.todos, foundIndex);
    },
    editedTodo(todo, title) {
      console.log('editedTodo!', todo, title);
    },
  },
};
</script>
