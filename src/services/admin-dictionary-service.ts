import {ApiResponse, Dictionary} from "@/types/api.ts";
import apiClient from "@/services/api-client.ts";
import {DictionaryListResponse, TypeCard} from "@/types/dictionary.ts";


export const adminDictionaryService = {
    getGenders: async (): Promise<ApiResponse<DictionaryListResponse<Dictionary>>> => {
        return await apiClient.get("/v1/dictionary/sex");
    },
    getNationalities: async (): Promise<ApiResponse<DictionaryListResponse<Dictionary>>> => {
        return await apiClient.get("/v1/dictionary/nationality");
    },

    getEducations: async (): Promise<ApiResponse<DictionaryListResponse<Dictionary>>> => {
        return await apiClient.get("/v1/dictionary/education");
    },

    getSocialStatuses: async (): Promise<ApiResponse<DictionaryListResponse<Dictionary>>> => {
        return await apiClient.get("/v1/dictionary/social-status");
    },

    getSpecializations: async (): Promise<ApiResponse<DictionaryListResponse<Dictionary>>> => {
        return await apiClient.get("/v1/dictionary/speciality");
    },

    getInstitutes: async (): Promise<ApiResponse<DictionaryListResponse<Dictionary>>> => {
        return await apiClient.get("/v1/dictionary/institution");
    },

    getFaculties: async (): Promise<ApiResponse<DictionaryListResponse<Dictionary>>> => {
        return await apiClient.get("/v1/dictionary/faculty");
    },

    getAcademicDegrees: async (): Promise<ApiResponse<DictionaryListResponse<Dictionary>>> => {
        return await apiClient.get("/v1/dictionary/academic-degree");
    },
    getTypeCards: async (): Promise<ApiResponse<DictionaryListResponse<TypeCard>>> => {
        return await apiClient.get("/v1/dictionary/type-card");
    },
    getTypeCardBackground: async (id: number): Promise<string> => {
        const response = await apiClient.get(`/v1/dictionary/type-card/${id}/backgrounds`);
        return response.data; // строка base64
    },
};
