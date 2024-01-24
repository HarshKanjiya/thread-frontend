export interface IUserInitialState {
  userData: Object | null,
  loading: boolean,
  success: boolean,
  message: string | null,
  // TaskSuccess: boolean
}

export const UserInitialState: IUserInitialState = {
  userData: null,
  loading: false,
  success: false,
  message: null,
  // TaskSuccess: false
}


export interface ILoginUser {
  uniqueId: string,
  password: string
}

export interface ISignupUser {
  username: string,
  name: string
  phoneNumber: string
  password: string,
  gender: "MALE" | "FEMALE"
  birthDate: string
  avatar: string
}

export interface ICheckValidUsername {
  username: string
}

export interface ISendMeOtp {
  email: string
}
export interface IVerifyMyOtp {
  otp: string
}

// // RESPONSES

// export interface ILoginResponse {
//   Message: string,
//   Success: boolean,
//   Data?: Object,
//   AccessToken?: string
//   RefreshToken?: string
// }
