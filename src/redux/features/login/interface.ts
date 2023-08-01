import { SIGNUP_TYPE } from "interfaces";

export interface UserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: "user"|"admin";
  status: "active"|"inactive";
  signupType: SIGNUP_TYPE;
  createdAt: Date;
  updatedAt: Date;
  token: string
}
