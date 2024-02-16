import { createAction, props } from "@ngrx/store"

export const SET_USER_ACTION_MESSAGE = createAction("[ACTION] set message", props<{ message: string | null }>())
export const SET_USER_ACTION_SUCCESS = createAction("[ACTION] set success", props<{ success: boolean }>())
export const SET_USER_ACTION_LOADING = createAction("[ACTION] set loading", props<{ loading: boolean }>())

export const SET_USER_ACTION_TEMP = createAction("[ACTION] set temp", props<any>())
export const SET_USER_ACTION_SEARCH_RESULTS = createAction("[ACTION] search results", props<{ list: any[] }>())
