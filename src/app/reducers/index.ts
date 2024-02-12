import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { UserReducer } from './User/UserReducer';
import { PostReducer } from './Post/PostReducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  User: UserReducer,
  Post: PostReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
