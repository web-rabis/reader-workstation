
import { RegistrationFormData,initRegistrationFormData} from "./registration";
import { Dictionary, dictionaryWithLabel } from "./dictionary";
import {number, string} from "zod";

export type { RegistrationFormData,Dictionary  };
export {initRegistrationFormData, dictionaryWithLabel};
export interface Error {
    status: string;
    code: number;
    message: string;
}
export interface ApiResponse<T> {
  data: T;
  error?: Error;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegistrationResponse {
  ticketNumber: number;
  status: "pending" | "reregistration";
}

export interface RegistrationDetailsResponse extends RegistrationFormData {
  id: number;
  status: "pending" | "approved" | "rejected";
  date: string;
}
export interface Paging {
    skip?: number
    limit?: number
    orderBy?: string
    order?: number
}

export interface User{
    id: number;
    username: string;
    email: string;
    name: string;
    department: Department;
}

export interface Department {
    id: number;
    code: string;
    name: string;
};