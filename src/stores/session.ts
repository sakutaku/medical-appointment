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
  showModalBicarbonate: boolean;
  isDataFetched: boolean;
  chosenInjectionSize: number | null;
  chosenInjectionType: string;
  bicarbonateType: string;
  bicarbonate: string;
  patientWeight: string;
  anticoagulants: string;
  anticoagulantsVol: string;
  appointment: boolean;
  showModalDrug: boolean;
  drugs: string[];
  drugsLoading: boolean;
  chosenDrug: string;
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
    showModalBicarbonate: false,
    isDataFetched: false,
    chosenInjectionSize: null,
    chosenInjectionType: '',
    bicarbonateType: 'Жидкий',
    bicarbonate: '',
    patientWeight: '',
    anticoagulants: '',
    anticoagulantsVol: '',
    appointment: false,
    showModalDrug: false,
    drugs: [],
    drugsLoading: false,
    chosenDrug: '',
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
    addBicarbonateType(bicarbonate: string) {
      this.bicarbonateType = bicarbonate;
    },
    addBicarbonate(bicarbonate: string) {
      this.bicarbonate = bicarbonate;
    },
    addPatientWeight(weight: string) {
      this.patientWeight = weight;
    },
    addAnticoagulants(anticoagulants: string) {
      this.anticoagulants = anticoagulants;
    },
    addAnticoagulantsVol(anticoagulants: string) {
      this.anticoagulantsVol = anticoagulants;
    },
    setShowModal(value: boolean, info: string) {
      this.showModal = value;
      this.modalInfo = info;
    },
    setShowModalBic(value: boolean, info: string) {
      this.showModalBicarbonate = value;
      this.modalInfo = info;
    },
    setShowModalDrug(value: boolean) {
      this.showModalDrug = value;
    },
    setShowAppointment(value: boolean) {
      this.appointment = value;
    },
    setInjectionSize(value: number) {
      this.chosenInjectionSize = value;
    },
    setInjectionDrug(value: string) {
      this.chosenDrug = value;
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
    async fetchDrugs() {
      this.drugsLoading = true;
      try {
        const response = await axios.get('https://js-course-18-87cf5-default-rtdb.europe-west1.firebasedatabase.app/drug.json');
        this.drugs = response.data;
      } catch (error) {
        console.log('Error fetching:', error);
      } finally {
        this.drugsLoading = false;
      }
    },
  },
});
