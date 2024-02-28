import { createAction, props } from "@ngrx/store"
import { INotification } from "../../Interfaces/Common"

export const SET_USER_MESSAGE = createAction("[USER] set message", props<{ message: string | null }>())
export const SET_USER_SUCCESS = createAction("[USER] set success", props<{ success: boolean }>())
export const SET_USER_LOADING = createAction("[USER] set loading", props<{ loading: boolean }>())
export const SET_USER_DATA = createAction("[USER] set data", props<{ data: Object | null }>())
export const SET_USER_OTHER_USER = createAction("[USER] set other user's data", props<{ data: any }>())
export const SET_USER_NOTIF = createAction("[USER] set notif", props<{ notifs: INotification[] }>())
export const SET_USER_TEMP = createAction("[USER] set temp", props<any>())
