import { defineStore } from 'pinia'
import axios from 'axios'

interface SessionState {
  needlesSize: number[];
  needlesType: string[];
  needlesLoading: boolean;
  catheterSize: number[];
  catheterType: string[];
  catheterLoading: boolean;
  program: string;
  concentratorSize: number;
  injection: null | string;
  modalInfo: string;
  showModal: boolean;
  isDataFetched: boolean;
  chosenInjectionSize: number | null;
  chosenInjectionType: string;
}

export const useSessionStore = defineStore({
  id: 'sessions',
  state: (): SessionState => ({
    needlesSize: [],
    needlesType: [],
    needlesLoading: false,
    catheterSize: [],
    catheterType: [],
    catheterLoading: false,
    program: '',
    concentratorSize: 0,
    injection: null,
    modalInfo: '',
    showModal: false,
    isDataFetched: false,
    chosenInjectionSize: null,
    chosenInjectionType: '',
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
      this.chosenInjectionSize = null
      this.chosenInjectionType = ''
    },
    setShowModal(value: boolean, info: string) {
      this.showModal = value;
      this.modalInfo = info;
    },
    setInjectionSize(value: number) {
      this.chosenInjectionSize = value;
    },
    setInjectionType(value: string) {
      this.chosenInjectionType = value;
    },
    async fetchNeedlesSize() {
      this.needlesLoading = true;
      try {
        const response = await axios.get('https://js-course-18-87cf5-default-rtdb.europe-west1.firebasedatabase.app/needlesSize.json');
        this.needlesSize = response.data;
      } catch (error) {
        console.log('Error fetching:', error);
      } finally {
        this.needlesLoading = false;
      }
    },
    async fetchNeedlesType() {
      this.needlesLoading = true;
      try {
        const response = await axios.get('https://js-course-18-87cf5-default-rtdb.europe-west1.firebasedatabase.app/needlesType.json');
        this.needlesType = response.data;
      } catch (error) {
        console.log('Error fetching:', error);
      } finally {
        this.needlesLoading = false;
      }
    },
    async fetchCatheterSize() {
      this.catheterLoading = true;
      try {
        const response = await axios.get('https://js-course-18-87cf5-default-rtdb.europe-west1.firebasedatabase.app/catheterSize.json');
        this.catheterSize = response.data;
      } catch (error) {
        console.log('Error fetching:', error);
      } finally {
        this.catheterLoading = false;
      }
    },
    async fetchCatheterType() {
      this.catheterLoading = true;
      try {
        const response = await axios.get('https://js-course-18-87cf5-default-rtdb.europe-west1.firebasedatabase.app/catheterType.json');
        this.catheterType = response.data;
      } catch (error) {
        console.log('Error fetching:', error);
      } finally {
        this.catheterLoading = false;
      }
    },
  },
});
