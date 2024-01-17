import { createAction, createReducer, on, props } from "@ngrx/store";



export const addFormAction = createAction("[Form] new", props<{ JsonData: any }>())
export const addResponseAction = createAction("[Res] new", props<{ data: any }>())

export const UserLoginActions = createAction("[USER] login", props<{ id: string, password: string }>())
export const UserForgotPassActions = createAction("[USER] forgot_password", props<{ id: string, password: string }>())
export const UserSignUpActions = createAction("[USER] signup", props<{ id: string, password: string }>())



export const UserReducer = createReducer(
  {
    UserData: null,
    loading: false,
    success: false,
    error: null

  },
  on(addFormAction, (state: any, payload) => {

    return { ...state, JsonData: payload.JsonData }
  }),
  on(addResponseAction, (state: any, payload) => {
    const newData = [...state.responses, payload.data]
    return { ...state, responses: newData }
  })
)
