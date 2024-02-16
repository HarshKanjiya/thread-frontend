import { createAction, props } from "@ngrx/store"

export const SET_USER_ACTION_MESSAGE = createAction("[PACKAGE] set message", props<{ message: string | null }>())
export const SET_USER_ACTION_SUCCESS = createAction("[PACKAGE] set success", props<{ success: boolean }>())
export const SET_USER_ACTION_LOADING = createAction("[PACKAGE] set loading", props<{ loading: boolean }>())

export const SET_USER_ACTION_TEMP = createAction("[PACKAGE] set temp", props<any>())
