import { UserType } from "../userProfiles/UserType";

export interface SessionContext {
    userId: number;
    name: string;
    email: string;
    userType: UserType;
}