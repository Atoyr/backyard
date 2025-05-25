import { defineStore } from 'pinia';

type State = {
  // FIXME:
  todoList: string[];
}

export const useTodoListStore = defineStore('todoList', {
  state: (): State => ({
      todoList: [],
  }), 
  actions: {
    // FIXME: Implement the fetchTodoList method
    fetchTodoList() {
      return;
    }
  }
});

export type TodoListCtore = ReturnType<typeof useTodoListStore>;
