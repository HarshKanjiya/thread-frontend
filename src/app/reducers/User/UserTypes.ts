import { INotification } from "../../Interfaces/Common"

export interface IUserInitialState {
  userData: Object | null,
  loading: boolean,
  success: boolean,
  message: string | null,
  temp: any,
  notificatinos: INotification[],
  otherUserData: any

  // TaskSuccess: boolean
}

export const UserInitialState: IUserInitialState = {
  userData: null,
  loading: false,
  success: false,
  message: null,
  temp: null,
  otherUserData: null,
  notificatinos: []
  // TaskSuccess: false
}


export interface ILoginUser {
  UniqueId: string,
  Password: string
}

export interface ISignupUser {
  Email: string
  UserName: string,
  Name: string
  PhoneNumber: string
  Password: string,
  Gender: "MALE" | "FEMALE" | "KEEP_SECRET" | string
  BirthDate: string
  Avatar: string
}

export interface ICheckValidUsername {
  UserName: string
}

export interface ISendMeOtp {
  Email: string
}
export interface IVerifyMyOtp {
  Otp: string
  Email: string
}

// // RESPONSES

// export interface ILoginResponse {
//   Message: string,
//   Success: boolean,
//   Data?: Object,
//   AccessToken?: string
//   RefreshToken?: string
// }
