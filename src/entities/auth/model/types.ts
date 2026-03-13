import type { TUserData } from "@/shared/types";

export type TUserPayload = Record<"password", string> & Pick<"email" | "fullname", TUserData>;

export type TAuthState = {
  user: TUserData | null;
  isLoading: boolean;
}

export type TAuthStore = TAuthState & {
  register: (data: TUserPayload) => Promise<void>;
}
