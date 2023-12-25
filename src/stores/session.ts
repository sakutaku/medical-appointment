import { defineStore } from 'pinia'
import axios from 'axios'

interface Session {
  chosenDrug: string;
  chosenReceiptPath: string;
  chosenReceiptDose: string;
  numbers: number[];
  startDate: string;
  endDate: string;
  day: number;
}

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
  drugInfo: {
    chosenDrug: string;
    chosenReceiptPath: string;
    chosenReceiptDose: string;
  };
  selectedNumbers: number[];
  showModalReceipt: boolean;
  modalReceiptInfo: string;
  startDate: string | null;
  endDate: string | null;
  sessions: Session[];
  numberOfDays: number | null;
  showModalDrugHome: boolean;
  showModalDrugHomeInfo: string,
  drugInfoHome: {
    chosenDrug: string,
    chosenReceiptPath: string,
    chosenReceiptDose: string,
  },
  showModalReceiptHome: boolean;
  modalReceiptInfoHome: string;
  showModalFrequency: boolean;
  startDateFrequency: string | null;
  endDateFrequency: string | null;
  numberOfDaysFrequency: number | null;
  frequency: string | null;
  treatment: boolean;
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
    drugInfo: {
      chosenDrug: '',
      chosenReceiptPath: '',
      chosenReceiptDose: ''
    },
    selectedNumbers: [],
    showModalReceipt: false,
    modalReceiptInfo: '',
    startDate: null,
    endDate: null,
    sessions: [],
    numberOfDays: null,
    showModalDrugHome: false,
    showModalDrugHomeInfo: '',
    drugInfoHome: {
      chosenDrug: '',
      chosenReceiptPath: '',
      chosenReceiptDose: ''
    },
    showModalReceiptHome: false,
    modalReceiptInfoHome: '',
    showModalFrequency: false,
    startDateFrequency: null,
    endDateFrequency:null,
    numberOfDaysFrequency: null,
    frequency: null,
    treatment: false,
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
    setShowModalFrequency(value: boolean) {
      this.showModalFrequency = value;
    },
    setShowModalDrugHome(value: boolean, info: string) {
      this.showModalDrugHome = value;
      this.showModalDrugHomeInfo = info;
    },
    setShowAppointment(value: boolean) {
      this.appointment = value;
    },
    setShowTreatment(value: boolean) {
      this.treatment = value;
    },
    setFrequency(value: string) {
      this.frequency = value;
    },
    setShowModalReceipt(value: boolean, info: string) {
      this.showModalReceipt = value;
      this.modalReceiptInfo = info;
    },
    setShowModalReceiptHome(value: boolean, info: string) {
      this.showModalReceiptHome = value;
      this.modalReceiptInfoHome = info;
    },
    setActiveNumbers(numbers: number[]): void {
      this.selectedNumbers = numbers;
    },
    setAppointmentDates(startDate: string, endDate: string): void {
      this.startDate = startDate;
      this.endDate = endDate;
    },
    setNumberOfDays(value: number) {
      this.numberOfDays = value;
    },
    setAppointmentDatesFrequency(startDate: string, endDate: string): void {
      this.startDateFrequency = startDate;
      this.endDateFrequency = endDate;
    },
    setNumberOfDaysFrequency(value: number) {
      this.numberOfDaysFrequency = value;
    },
    setInjectionSize(value: number) {
      this.chosenInjectionSize = value;
    },
    setInjectionDrug(value: string) {
      this.drugInfo.chosenDrug = value;
    },
    setInjectionDrugPath(value: string) {
      this.drugInfo.chosenReceiptPath = value;
    },
    setInjectionDrugDose(value: string) {
      this.drugInfo.chosenReceiptDose = value;
    },
    setDrugHome(value: string) {
      this.drugInfoHome.chosenDrug = value;
    },
    setDrugHomePath(value: string) {
      this.drugInfoHome.chosenReceiptPath = value;
    },
    setDrugHomeDose(value: string) {
      this.drugInfoHome.chosenReceiptDose = value;
    },
    addSession(session: Session): void {
      this.sessions.push(session);
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
