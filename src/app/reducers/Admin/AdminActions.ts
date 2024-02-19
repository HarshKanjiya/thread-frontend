import { createAction, props } from "@ngrx/store"

export const SET_ADMIN_MESSAGE = createAction("[ADMIN] set message", props<{ message: string | null }>())
export const SET_ADMIN_SUCCESS = createAction("[ADMIN] set success", props<{ success: boolean }>())
export const SET_ADMIN_LOADING = createAction("[ADMIN] set loading", props<{ loading: boolean }>())

export const SET_ADMIN_TEMP = createAction("[ADMIN] set temp", props<any>())


export const SET_ADMIN_PACKAGES = createAction("[ADMIN] set active packages", props<{ packages: any[] }>())
export const SET_ADMIN_CONSTANTS = createAction("[ADMIN] set constants", props<{ constants: any[] }>())
