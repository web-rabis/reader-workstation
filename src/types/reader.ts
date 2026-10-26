import {Dictionary, TypeCard} from "@/types/dictionary.ts";

export interface Reader {
    photo:string;

    ticketNumber:number;
    barcode:string;
    registrationDate:string;
    expirationDate:string;
    lastVisitDate: string;
    status:string;
    firstname:string
    iin:string
    lastname:string;
    middlename?:string;
    yearBirth:number;
    birthDate:string;
    sex?:Dictionary;
    nationality?: Dictionary


    phone?:string;
    workPhone?:string;
    email?:string
    address:string;

    education?:Dictionary
    socialStatus?:Dictionary;
    institution?: Dictionary
    faculty?:Dictionary
    speciality?:Dictionary;
    academicDegree?:Dictionary;
    typeCard?:TypeCard;
    placeEmployment?:string;
    position?:string;
    course?:string
    readersHall?:string;
    note?:string;
    priznakUdal?:string;
    isEmployee?:boolean;
}
export interface ReaderUser {
    id:number;
    registrationDate:string;
    status:string;
    firstname:string
    iin:string
    lastname:string;
    middlename?:string;
    yearBirth:number
    birthDate:string;
    sex?:Dictionary;
    nationality?: Dictionary


    phone?:string;
    workPhone?:string;
    email?:string
    address:string;

    education?:Dictionary
    socialStatus?:Dictionary;
    institution?: Dictionary
    faculty?:Dictionary
    speciality?:Dictionary;
    academicDegree?:Dictionary;
    placeEmployment?:string;
    position?:string;
    course?:string
    readersHall?:string;
    note?:string;
}
export interface EditReaderFormData {
    photo: string | null;
    photoView: string | null;
    barCode: string | null;
    typeCard: number;
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
    readersHall: string;
    isEmployee: boolean;
}
export interface ReaderSearchParams {
    status: string;
    query: string;
    expirationDateLow: string;
    expirationDateHigh: string;
    advancedSearch: boolean;
    isEmployee?:boolean;
}
export const initEditReaderFormData: EditReaderFormData = {
    photoView: null,
    photo: null,
    typeCard: 0,
    barCode: null,
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
    readersHall:"",
    isEmployee: false,
};
export const editReaderFormDataFromReaderData = (data:Reader,photo):EditReaderFormData=>(
    {
        iin:data.iin ?? "",
        barCode:data.barcode ?? "",
        typeCard:data.typeCard?.id ?? 0,
        nationality: data.nationality?.id ?? 0,
        sex:data.sex?.id ?? 0,
        photo:null,
        photoView: photo==null?null:`data:image/jpeg;base64,${photo}`,
        lastname: data.lastname ?? "",
        middlename:data.middlename ?? "",
        firstname: data.firstname ?? "",
        birthDate: data.birthDate ? data.birthDate.split("T")[0] : "",
        address: data.address ?? "",
        phone: data.phone ?? "",
        workPhone: data.workPhone ?? "",
        email: data.email ?? "",
        education: data.education?.id ?? 0,
        socialStatus: data.socialStatus?.id ?? 0,
        speciality: data.speciality?.id ?? 0,
        institution: data.institution?.id ?? 0,
        faculty: data.faculty?.id ?? 0,
        course: data.course ?? "",
        workPlace: data.placeEmployment ?? "",
        position: data.position ?? "",
        academicDegree: data.academicDegree?.id ?? 0,
        status: data.status ?? "",
        readersHall: data.readersHall ?? "",
        isEmployee: data.isEmployee ?? false,
    })
export const initReaderSearchParams: ReaderSearchParams = {
    status: "",
    query: "",
    expirationDateLow: "",
    expirationDateHigh: "",
    advancedSearch: false,
    isEmployee: false,
}