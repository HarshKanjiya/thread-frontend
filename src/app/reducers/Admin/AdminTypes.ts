export interface IAdminInitialState {
  loading: boolean,
  success: boolean,
  message: string | null,

  packages: any[],
  constants: any[],
  temp: any

  userReports: any[],
  reports: any[],
  reportCategories: any[],
  bugReports: any[],

}
export const AdminInitialState: IAdminInitialState = {
  loading: false,
  success: false,
  message: null,

  packages: [],
  constants: [],
  temp: null,

  reportCategories: [],
  reports: [],
  userReports: [],
  bugReports: [],
}
