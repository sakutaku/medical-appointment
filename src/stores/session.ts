import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface SessionState {
  todos: Todo[];
  loading: boolean;
  program: string;
}
// export const useSessionStore = defineStore('session', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }
//
//   return { count, doubleCount, increment }
// })

export const useSessionStore = defineStore({
  id: 'sessions',
  state: (): SessionState => ({
    todos: [],
    loading: false,
    program: '',
  }),
  actions: {
    addProgram(program: string) {
      this.program = program;
    },
    async fetchTodos() {
      this.loading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
