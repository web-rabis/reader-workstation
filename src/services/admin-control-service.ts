import {ApiResponse, Dictionary, Paging} from "@/types/api.ts";
import apiClient from "@/services/api-client.ts";
import {Control, VisitsStatisticsResponse, VisitsTodayResponse} from "@/types/control.ts";
import {VisitStatusResponse} from "@/types/control.ts";


export const adminControlService = {
    visitsStatus: async (id:string): Promise<ApiResponse<VisitStatusResponse>> => {
        return await apiClient.get(`/v1/reader/${id}/visits/status`);
    },
    visitsCheckIn: async (id:number): Promise<ApiResponse<string>> => {
        return await apiClient.post(`/v1/reader/${id}/visits/check-in`);
    },
    visitsCheckOut: async (id:number): Promise<ApiResponse<string>> => {
        return await apiClient.post(`/v1/reader/${id}/visits/check-out`);
    },
    visitsToday: async (paging:Paging): Promise<ApiResponse<VisitsTodayResponse>> => {
        const queryParams = new URLSearchParams()
        if (paging.skip !== undefined) queryParams.append('skip', paging.skip.toString())
        if (paging.limit !== undefined) queryParams.append('limit', paging.limit.toString())
        if (paging.orderBy !== undefined) queryParams.append('orderBy', paging.orderBy)
        if (paging.order !== undefined) queryParams.append('order', String(paging.order))

        return await apiClient.get(`/v1/reader/visits/today?${queryParams.toString()}`);
    },
    visitsStatistics: async (): Promise<ApiResponse<VisitsStatisticsResponse>> => {
        return await apiClient.get(`/v1/reader/visits/statistics`);
    },
};
