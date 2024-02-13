import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { IPostInitialState } from './PostTypes';
import { SET_POST_DATA, SET_POST_LOADING, SET_POST_MY_THREADS, SET_POST_REPLIES } from './PostActions';
import { GetPostRepliesAPI, GetPostsOfSignleUserAPI, GetThreadDataAPI } from '../../Utils/Endpoints';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpService, private store: Store<IPostInitialState>, private toast: ToastService) { }

  createNewPost() {

  }

  getMyThreads(userId: string, page: number, type: "REPOST" | "PARENT") {
    this.store.dispatch(SET_POST_LOADING({ loading: true }))
    try {
      this.http.get(GetPostsOfSignleUserAPI + userId + "?type=" + type + "&pageNumber=" + page + "&pageSize=5")
        .subscribe((res: any) => {
          this.store.dispatch(SET_POST_LOADING({ loading: false }))

          if (res?.Success) {
            this.store.dispatch(SET_POST_MY_THREADS({ threads: res.Data }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_POST_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  getMyFeed(userId: string, page: number) {
    this.store.dispatch(SET_POST_LOADING({ loading: true }))
    try {
      this.http.get(GetPostsOfSignleUserAPI + userId + "&pageNumber=" + page + "&pageSize=5")
        .subscribe((res: any) => {
          this.store.dispatch(SET_POST_LOADING({ loading: false }))

          if (res?.Success) {
            this.store.dispatch(SET_POST_MY_THREADS({ threads: res.Data }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_POST_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  getThreadData(id: string) {
    this.store.dispatch(SET_POST_LOADING({ loading: true }))
    try {
      this.http.get(GetThreadDataAPI + id)
        .subscribe((res: any) => {
          this.store.dispatch(SET_POST_LOADING({ loading: false }))

          if (res?.Success) {
            this.store.dispatch(SET_POST_DATA({ data: res.Data }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_POST_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  getThreadReplies(id: string) {
    this.store.dispatch(SET_POST_LOADING({ loading: true }))
    try {
      this.http.get(GetPostRepliesAPI + id)
        .subscribe((res: any) => {
          this.store.dispatch(SET_POST_LOADING({ loading: false }))

          if (res?.Success) {
            this.store.dispatch(SET_POST_REPLIES({ replies: res.Data }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_POST_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
}
