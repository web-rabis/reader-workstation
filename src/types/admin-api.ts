import {Reader, ReaderUser, EditReaderFormData, ReaderSearchParams, initEditReaderFormData, initReaderSearchParams, editReaderFormDataFromReaderData} from "@/types/reader.ts";
import {Dictionary, dictionaryWithLabel} from "@/types/dictionary.ts";
export type { Reader, ReaderUser, EditReaderFormData, Dictionary, ReaderSearchParams}
export {initEditReaderFormData, initReaderSearchParams, editReaderFormDataFromReaderData, dictionaryWithLabel};
export interface ReaderListRequest {
    status?:string;
    query?:string;
    skip?: number
    limit?: number
}

export interface ReaderUserListRequest {
    status?:string;
    query?:string;
    skip?: number
    limit?: number
}
export interface ReaderUserListResponse {
    result: ReaderUser[];
    count: number;
}
export interface ReaderUserByIdResponse {
    result: ReaderUser;
}
export interface ReaderListResponse {
    result: Reader[];
    count: number;
}
export interface ReaderByIdResponse {
    result: Reader;
}
export interface ReaderApproveResponse {
    oldTicketNumber: number;
    ticketNumber: number;
    barcode: string;
    status: "pending" | "approved" | "rejected"| "";
    expirationDate: string;
}