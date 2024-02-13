import { createReducer, on } from "@ngrx/store";

import { PackageInitialState } from "./PackageTypes";
import { SET_PACKAGE_LOADING, SET_PACKAGE_SUCCESS, SET_PACKAGE_MESSAGE, SET_PACKAGE_TEMP, SET_PACKAGE_DATA, SET_PACKAGES } from "./PackageActions";




export const PostReducer = createReducer(
  PackageInitialState,
  on(SET_PACKAGE_LOADING, (state: any, { loading }) => {
    return { ...state, loading }
  }),

  on(SET_PACKAGE_SUCCESS, (state: any, { success }) => {
    return { ...state, success }
  }),

  on(SET_PACKAGE_MESSAGE, (state: any, { message }) => {
    return { ...state, message }
  }),

  on(SET_PACKAGES, (state: any, { packages }) => {
    return { ...state, packages }
  }),

  on(SET_PACKAGE_DATA, (state: any, { packageData }) => {
    return { ...state, packageData }
  }),

  on(SET_PACKAGE_TEMP, (state: any, { data }) => {
    return { ...state, temp: data }
  }),

)
