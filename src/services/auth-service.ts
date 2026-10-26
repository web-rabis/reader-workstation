
import { LoginRequest, LoginResponse, User, ApiResponse } from "@/types/api";
import {ssoClient} from "@/services/api-client.ts";
import {clearStorageKeys, KEY_PAGING, KEY_SEARCH} from "@/lib/stateStorage.ts";

export const authService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
      clearStorageKeys([KEY_SEARCH, KEY_PAGING ]);
    return await ssoClient.post("/v1/auth/sign-in/login", credentials);
  },

  profile: async (): Promise<ApiResponse<User>> => {
    return await ssoClient.get("/v1/profile");
  },

  logout: () => {
      clearStorageKeys([KEY_SEARCH, KEY_PAGING ]);
    localStorage.removeItem("librarian-token");
  },
};
