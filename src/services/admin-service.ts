import {
    ReaderApproveResponse,
    ReaderByIdResponse,
    ReaderListRequest,
    ReaderListResponse, ReaderSearchParams,
} from "@/types/admin-api.ts";
import {ApiResponse, Paging} from "@/types/api.ts";
import apiClient from "@/services/api-client.ts";
import {RegistrationFormData} from "@/types/registration.ts";

export const adminReaderService = {
    getReaderAll: async (params: ReaderSearchParams, paging:Paging): Promise<ApiResponse<ReaderListResponse>> => {
        const queryParams = new URLSearchParams()
        if (paging.skip !== undefined) queryParams.append('skip', paging.skip.toString())
        if (paging.limit !== undefined) queryParams.append('limit', paging.limit.toString())
        if (params.status !== undefined) queryParams.append('status', params.status)
        if (paging.orderBy !== undefined) queryParams.append('orderBy', paging.orderBy)
        if (paging.order !== undefined) queryParams.append('order', String(paging.order))
        if (params.query !== undefined && params.query.length >= 3) queryParams.append('query', params.query)
        if (params.advancedSearch) {
            if (params.expirationDateLow !== undefined) queryParams.append('expirationDateLow', params.expirationDateLow)
            if (params.expirationDateHigh !== undefined) queryParams.append('expirationDateHigh', params.expirationDateHigh)
            if (params.isEmployee !== undefined) queryParams.append('isEmployee', params.isEmployee.toString())
        }
        return await apiClient.get(`/v1/reader?${queryParams.toString()}`);
    },

    approveReaderRegistration: async (id: number): Promise<ApiResponse<ReaderApproveResponse>> => {
        return await apiClient.put(`/v1/reader/${id}/approve`);
    },

    rejectReaderRegistration: async (id: number): Promise<ApiResponse<string>> => {
        return await apiClient.put(`/v1/reader/${id}/reject`);
    },

    renewalReaderRegistration: async (id: number): Promise<ApiResponse<string>> => {
        return await apiClient.put(`/v1/reader/${id}/renewal-registration`);
    },

    getReaderById: async (id: number): Promise<ApiResponse<ReaderByIdResponse>> => {
        return await apiClient.get(`/v1/reader/${id}`);
    },

    getReaderPhoto: async (id: number): Promise<string> => {
        const response = await apiClient.get(`/v1/reader/${id}/photo`);
        return response.data; // строка base64
    },

    rotateReaderPhoto90: async (id: number): Promise<string> => {
        const response = await apiClient.put(`/v1/reader/${id}/photo/rotate90`);
        return response.data; // строка base64
    },

    rotateReaderPhoto270: async (id: number): Promise<string> => {
        const response = await apiClient.put(`/v1/reader/${id}/photo/rotate270`);
        return response.data; // строка base64
    },

    createReader: async (formData: RegistrationFormData): Promise<ApiResponse<string>> => {
        return await apiClient.post(`/v1/reader`, formData);
    },

    updateReader: async (id: number, formData: RegistrationFormData): Promise<ApiResponse<string>> => {
        return await apiClient.put(`/v1/reader/${id}`, formData);
    },
    deleteReader: async (id: number): Promise<ApiResponse<string>> => {
        return await apiClient.delete(`/v1/reader/${id}`);
    },
}

export const adminReaderEmployeeService = {
    getReaderAll: async (params: ReaderSearchParams, paging:Paging): Promise<ApiResponse<ReaderListResponse>> => {
        const queryParams = new URLSearchParams()
        if (paging.skip !== undefined) queryParams.append('skip', paging.skip.toString())
        if (paging.limit !== undefined) queryParams.append('limit', paging.limit.toString())
        if (params.status !== undefined) queryParams.append('status', params.status)
        if (paging.orderBy !== undefined) queryParams.append('orderBy', paging.orderBy)
        if (paging.order !== undefined) queryParams.append('order', String(paging.order))
        if (params.query !== undefined && params.query.length >= 3) queryParams.append('query', params.query)
        if (params.advancedSearch) {
            if (params.expirationDateLow !== undefined) queryParams.append('expirationDateLow', params.expirationDateLow)
            if (params.expirationDateHigh !== undefined) queryParams.append('expirationDateHigh', params.expirationDateHigh)
        }
        return await apiClient.get(`/v1/reader-employee?${queryParams.toString()}`);
    },


    renewalReaderRegistration: async (id: number): Promise<ApiResponse<string>> => {
        return await apiClient.put(`/v1/reader-employee/${id}/renewal-registration`);
    },

    getReaderById: async (id: number): Promise<ApiResponse<ReaderByIdResponse>> => {
        return await apiClient.get(`/v1/reader-employee/${id}`);
    },

    getReaderPhoto: async (id: number): Promise<string> => {
        const response = await apiClient.get(`/v1/reader-employee/${id}/photo`);
        return response.data; // строка base64
    },

    rotateReaderPhoto90: async (id: number): Promise<string> => {
        const response = await apiClient.put(`/v1/reader-employee/${id}/photo/rotate90`);
        return response.data; // строка base64
    },

    rotateReaderPhoto270: async (id: number): Promise<string> => {
        const response = await apiClient.put(`/v1/reader-employee/${id}/photo/rotate270`);
        return response.data; // строка base64
    },

    createReader: async (formData: RegistrationFormData): Promise<ApiResponse<string>> => {
        return await apiClient.post(`/v1/reader-employee`, formData);
    },

    updateReader: async (id: number, formData: RegistrationFormData): Promise<ApiResponse<string>> => {
        return await apiClient.put(`/v1/reader-employee/${id}`, formData);
    },

    deleteReader: async (id: number): Promise<ApiResponse<string>> => {
        return await apiClient.delete(`/v1/reader-employee/${id}`);
    },
}