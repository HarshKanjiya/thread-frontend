import { createAction, props } from "@ngrx/store"

export const SET_PACKAGE_MESSAGE = createAction("[PACKAGE] set message", props<{ message: string | null }>())
export const SET_PACKAGE_SUCCESS = createAction("[PACKAGE] set success", props<{ success: boolean }>())
export const SET_PACKAGE_LOADING = createAction("[PACKAGE] set loading", props<{ loading: boolean }>())

export const SET_PACKAGES = createAction("[PACKAGE] set packages ", props<{ packages: any[] }>())
export const SET_PACKAGE_DATA = createAction("[PACKAGE] set package data ", props<{ packageData: any }>())

export const SET_PACKAGE_TEMP = createAction("[PACKAGE] set temp", props<any>())
