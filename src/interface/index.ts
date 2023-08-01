export interface ILogin {
    email: string;
    password: string;
  }
  export interface ILoginSocial {
    token: string;
  }
  export enum SIGNUP_TYPE {
    EMAIL_PASSWORD = "email password",
    GOOGLE = "google",
    FACEBOOK = "facebook",
  }
  export interface ISignUp{
    email: string;
    password: string;
    firstName:string;
    lastName:string;
  }
  export interface IPaging{
    page:number;
    limit:number
  }