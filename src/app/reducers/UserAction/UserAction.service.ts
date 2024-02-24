import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { IAddPollResponseAction, ILikeThreadAction, IUserActionInitialState, IUserRelationAction } from './UserActionTypes';
import { SET_USER_ACTION_LOADING, SET_USER_ACTION_SEARCH_RESULTS, SET_USER_ACTION_SUCCESS } from './UserActionActions';
import { BlockAPI, FollowAPI, LikeAPI, MuteAPI, SearchUserAPI, VotePollAPI } from '../../Utils/Endpoints';
import { SET_USER_TEMP } from '../User/UserActions';


@Injectable({
  providedIn: 'root'
})
export class UserActionService {

  constructor(private http: HttpService, private store: Store<IUserActionInitialState>, private toast: ToastService) { }



  LikeThreadAction(data: ILikeThreadAction) {
    this.store.dispatch(SET_USER_ACTION_LOADING({ loading: true }))
    try {
      this.http.post(LikeAPI, data)
        .subscribe((res: any) => {
          this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
          if (res?.Success == false) {
            this.store.dispatch(SET_USER_TEMP({ LIKE_SUCCESS: false }))
            this.toast.makeToast("ERROR", res?.Message ? res.Message : "Something went wrong!")
          }
        })

    } catch (e: any) {
      this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
      console.log('Error in likeing :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  AddPollResponseAction(data: IAddPollResponseAction) {
    this.store.dispatch(SET_USER_ACTION_LOADING({ loading: true }))
    try {
      this.http.post(VotePollAPI, data)
        .subscribe((res: any) => {
          this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
          if (res?.Success == false) {
            this.store.dispatch(SET_USER_TEMP({ POLL_SUCCESS: false }))
            this.toast.makeToast("ERROR", res?.Message ? res.Message : "Something went wrong!")
          }
        })

    } catch (e: any) {
      this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
      console.log('Error in poll response :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  FollowUserAction(data: IUserRelationAction) {
    this.store.dispatch(SET_USER_ACTION_LOADING({ loading: true }))
    try {
      this.http.post(FollowAPI, data)
        .subscribe((res: any) => {
          this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
          if (res?.Success) {
            this.toast.makeToast("MESSAGE", res?.Message ? res.Message : "Something went wrong!")
          } else {
            this.toast.makeToast("ERROR", res?.Message ? res.Message : "Something went wrong!")
          }
        })

    } catch (e: any) {
      this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
      console.log('Error in follow :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  MuteUserAction(data: IUserRelationAction) {
    this.store.dispatch(SET_USER_ACTION_LOADING({ loading: true }))
    try {
      this.http.post(MuteAPI, data)
        .subscribe((res: any) => {
          this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
          if (res?.Success) {
            this.toast.makeToast("MESSAGE", res?.Message ? res.Message : "Something went wrong!")
          } else {
            this.toast.makeToast("ERROR", res?.Message ? res.Message : "Something went wrong!")
          }
        })

    } catch (e: any) {
      this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
      console.log('Error in Muting :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  BlockUserAction(data: IUserRelationAction) {
    this.store.dispatch(SET_USER_ACTION_LOADING({ loading: true }))
    try {
      this.http.post(BlockAPI, data)
        .subscribe((res: any) => {
          this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
          if (res?.Success) {
            this.toast.makeToast("MESSAGE", res?.Message ? res.Message : "Something went wrong!")
          } else {
            this.toast.makeToast("ERROR", res?.Message ? res.Message : "Something went wrong!")
          }
        })

    } catch (e: any) {
      this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
      console.log('Error in Blocking :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  SearchUserProfiles(text: string) {
    this.store.dispatch(SET_USER_ACTION_LOADING({ loading: true }))
    try {
      this.http.post(SearchUserAPI, { UserName: text })
        .subscribe((res: any) => {
          this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_USER_ACTION_SEARCH_RESULTS({ list: res.Data }))
          }
        })

    } catch (e: any) {
      this.store.dispatch(SET_USER_ACTION_LOADING({ loading: false }))
      console.log('Error in Blocking :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
}
