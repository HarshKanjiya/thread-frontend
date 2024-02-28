import { createAction, props } from "@ngrx/store"

export const SET_ADMIN_MESSAGE = createAction("[ADMIN] set message", props<{ message: string | null }>())
export const SET_ADMIN_SUCCESS = createAction("[ADMIN] set success", props<{ success: boolean }>())
export const SET_ADMIN_LOADING = createAction("[ADMIN] set loading", props<{ loading: boolean }>())

export const SET_ADMIN_TEMP = createAction("[ADMIN] set temp", props<any>())


export const SET_ADMIN_PACKAGES = createAction("[ADMIN] set active packages", props<{ packages: any[] }>())
export const SET_ADMIN_CONSTANTS = createAction("[ADMIN] set constants", props<{ constants: any[] }>())
export const SET_ADMIN_APPEND_CONSTANTS = createAction("[ADMIN] set constants append", props<{ constant: any[] }>())


export const SET_ADMIN_USER_REPORTS = createAction("[ADMIN] set user reports", props<{ reports: any[] }>())
export const SET_ADMIN_REPORT_CATEGORIES = createAction("[ADMIN] set report categories", props<{ reportCategories: any[] }>())
export const SET_ADMIN_REPORT = createAction("[ADMIN] set reports", props<{ reports: any[] }>())
export const SET_ADMIN_BUG_REPORT = createAction("[ADMIN] set bug reports", props<{ reports: any[] }>())
