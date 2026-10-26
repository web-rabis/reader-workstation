export interface RegistrationFormData {
  photo: string | null;
  photoView: string | null;
  iin: string;
  lastname: string;
  middlename: string;
  firstname: string;
  birthDate: string;
  address: string;
  phone: string;
  workPhone: string;
  email: string;
  nationality: number;
  sex?: number;
  education: number;
  socialStatus: number;
  speciality: number;
  institution: number;
  faculty: number;
  course: string;
  workPlace: string;
  position: string;
  academicDegree: number;
  status:string;
}
export const initRegistrationFormData: RegistrationFormData = {
    photoView: null,
    photo: null,
    iin: "",
    lastname: "",
    middlename:"",
    firstname: "",
    birthDate: "",
    address: "",
    phone: "",
    workPhone: "",
    email: "",
    nationality: 0,
    sex: 0,
    education: 0,
    socialStatus: 0,
    speciality: 0,
    institution: 0,
    faculty: 0,
    course: "",
    workPlace: "",
    position: "",
    academicDegree: 0,
    status:"",
};
