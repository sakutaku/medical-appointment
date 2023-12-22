import { defineStore } from 'pinia'
import axios from 'axios'
interface Needles {
  id: string;
  type: string;
  size: number;
}

interface SessionState {
  needles: Needles[];
  needlesLoading: boolean;
  program: string;
  concentratorSize: number;
  injection: null | string;
  modalInfo: string;
  showModal: boolean;
}

export const useSessionStore = defineStore({
  id: 'sessions',
  state: (): SessionState => ({
    needles: [],
    needlesLoading: false,
    program: '',
    concentratorSize: 0,
    injection: null,
    modalInfo: '',
    showModal: false,
  }),
  actions: {
    addProgram(program: string) {
      this.program = program;
    },
    addConcentratorSize(size: number) {
      this.concentratorSize = size
    },
    addInjection(injection: string) {
      this.injection = injection
    },
    setShowModal(value: boolean, info: string) {
      this.showModal = value;
      this.modalInfo = info;
    },
    async fetchNeedles() {
      this.needlesLoading = true;
      try {
        const response = await axios.get('https://js-course-18-87cf5-default-rtdb.europe-west1.firebasedatabase.app/needles.json');
        this.needles = response.data;
      } catch (error) {
        console.log('Error fetching:', error);
      } finally {
        this.needlesLoading = false;
      }
    },
  },
});
