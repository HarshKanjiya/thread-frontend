import { createReducer, on } from "@ngrx/store";

import { SET_ADMIN_APPEND_CONSTANTS, SET_ADMIN_BUG_REPORT, SET_ADMIN_CONSTANTS, SET_ADMIN_LOADING, SET_ADMIN_MESSAGE, SET_ADMIN_PACKAGES, SET_ADMIN_REPORT, SET_ADMIN_REPORT_CATEGORIES, SET_ADMIN_SUCCESS, SET_ADMIN_TEMP, SET_ADMIN_USER_REPORTS } from "./AdminActions";
import { AdminInitialState } from "./AdminTypes";




export const AdminReducer = createReducer(
  AdminInitialState,
  on(SET_ADMIN_LOADING, (state: any, { loading }) => {
    return { ...state, loading }
  }),

  on(SET_ADMIN_SUCCESS, (state: any, { success }) => {
    return { ...state, success }
  }),

  on(SET_ADMIN_MESSAGE, (state: any, { message }) => {
    return { ...state, message }
  }),

  on(SET_ADMIN_PACKAGES, (state: any, { packages }) => {
    return { ...state, packages }
  }),

  on(SET_ADMIN_CONSTANTS, (state: any, { constants }) => {
    return { ...state, constants }
  }),

  on(SET_ADMIN_APPEND_CONSTANTS, (state: any, { constant }) => {
    return { ...state, constants: [...state.constants, constant] }
  }),

  on(SET_ADMIN_REPORT, (state: any, { reports }) => {
    return { ...state, reports }
  }),
  on(SET_ADMIN_REPORT_CATEGORIES, (state: any, { reportCategories }) => {
    return { ...state, reportCategories }
  }),
  on(SET_ADMIN_USER_REPORTS, (state: any, { reports }) => {
    return { ...state, userReports: reports }
  }),
  on(SET_ADMIN_BUG_REPORT, (state: any, { reports }) => {
    return { ...state, bugReports: reports }
  }),

  on(SET_ADMIN_TEMP, (state: any, { data }) => {
    return { ...state, temp: data }
  }),

)
