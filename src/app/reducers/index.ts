import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { UserReducer } from './UserReducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  form: formReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
