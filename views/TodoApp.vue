<template>
  <div class="todo-app">
    <div class="todo-app__actions">
      <div class="filters">
        <router-link to="all" tag="button"> 모든 항목 ({{ total }}) </router-link>
        <router-link to="active" tag="button"> 해야 할 항목 ({{ activeCount }}) </router-link>
        <router-link to="completed" tag="button"> 완료된 항목 ({{ completedCount }}) </router-link>
      </div>

      <div class="actions">
        <input v-model="allDone" type="checkbox" />
        <button @click="clearCompleted">완료된 항목 삭제</button>
      </div>
    </div>

    <div class="todo-app__list">
      <todo-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
        @edited-todo="editedTodo"
      />
    </div>
    <hr />
    <todo-creator class="todo-app__creator" @create-todo="createTodo" />
  </div>
</template>

<script>
import lowdb from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import assign from 'lodash/assign';
import forEachRight from 'lodash/forEachRight';
import TodoCreator from '~/components/TodoCreator';
import TodoItem from '~/components/TodoItem';

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
  computed: {
    filteredTodos() {
      switch (this.$route.params.id) {
        case 'all':
        default:
          return this.todos;
        case 'active':
          return this.todos.filter(({ done }) => !done);
        case 'completed':
          return this.todos.filter(({ done }) => done);
      }
    },
    total() {
      return this.todos.length;
    },
    activeCount() {
      return this.todos.filter(({ done }) => !done).length;
    },
    completedCount() {
      return this.total - this.activeCount;
    },
    allDone: {
      get() {
        return this.total === this.completedCount && this.total > 0;
      },
      set(checked) {
        this.completeAll(checked);
      },
    },
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
    completeAll(checked) {
      console.log(checked);
      const responseTodos = this.db
        .get('todos')
        .forEach(todo => {
          todo.done = checked;
        })
        .write();

      this.todos = cloneDeep(responseTodos);
    },
    clearCompleted() {
      // this.todos
      //   .reduce((list, todo, index) => {
      //     if (todo.done) {
      //       list.push(index);
      //     }
      //     return list;
      //   }, [])
      //   .reverse()
      //   .forEach(index => this.deleteTodo(this.todos[index]));

      forEachRight(this.todos, todo => {
        if (todo.done) {
          this.deleteTodo(todo);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
button.router-link-exact-active {
  font-weight: 700;
}
</style>
