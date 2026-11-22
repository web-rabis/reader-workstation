import {Reader} from "@/types/reader.ts";

export interface VisitStatusResponse {
    status:string;
    since:string;
    reader:Reader;
    orders:Order[];
}

export interface VisitsTodayResponse {
    result:Visit[];
    count:number;
}

export interface VisitsStatisticsResponse {
    all:number;
    inHall:number;
}

export interface Order{
    id:number;
    type:string;
    status:Status;
    orderedAt:string;
    department:Department;
    ebook:Ebook;
    magazine:Magazine;
}
export interface Ebook{
    id:number;
    author:string;
    title:string;
    inv:Inv;
}
export interface Magazine{
    id:number;
    nkr:number;
    title:string;
    number:string;
    year:string;
    inv:Inv;
}
export interface Inv{
    id:number;
    invNumber:string;
    barcode
}
export interface Status{
    id:number;
    code:string;
    name:string;
}

export interface Department{
    id:number;
    code:string;
    name:string;
}

export interface Visit {
    id:number;
    readerId:number;
    libraryId:number;
    branchId:number;
    departmentId?:number;
    checkedInAt?:string;
    checkedOutAt?:string;
    checkedInBy:number;
    checkedOutBy:number;
}