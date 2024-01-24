import { createAction, props } from "@ngrx/store"

export const SET_USER_MESSAGE = createAction("[USER] set message", props<{ message: string | null }>())
export const SET_USER_SUCCESS = createAction("[USER] set success", props<{ success: boolean }>())
export const SET_USER_LOADING = createAction("[USER] set loading", props<{ loading: boolean }>())
export const SET_USER_DATA = createAction("[USER] set data", props<{ data: Object | null }>())
