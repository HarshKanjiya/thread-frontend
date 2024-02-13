export interface IPackagesInitialState {
  loading: boolean,
  success: boolean,
  message: string | null,

  packages: any[]
  packageData: any
  temp: any

}
export const PackageInitialState: IPackagesInitialState = {
  loading: false,
  success: false,
  message: null,

  packages: [],
  packageData: null,

  temp: null,
}
