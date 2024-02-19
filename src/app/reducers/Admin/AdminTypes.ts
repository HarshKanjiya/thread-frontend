export interface IAdminInitialState {
  loading: boolean,
  success: boolean,
  message: string | null,

  packages: any[],
  constants: any[],
  temp: any

}
export const AdminInitialState: IAdminInitialState = {
  loading: false,
  success: false,
  message: null,

  packages: [],
  constants: [],
  temp: null,
}
