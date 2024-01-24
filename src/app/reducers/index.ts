import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { UserReducer } from './User/UserReducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  User: UserReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
