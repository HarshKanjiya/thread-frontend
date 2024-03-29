import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { UserReducer } from './User/UserReducer';
import { PostReducer } from './Post/PostReducer';
import { UserActionReducer } from './UserAction/UserActionReducer';
import { AdminReducer } from './Admin/AdminReducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  User: UserReducer,
  Post: PostReducer,
  Action: UserActionReducer,
  Admin: AdminReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
