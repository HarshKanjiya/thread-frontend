import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { IPostInitialState } from './PostTypes';
import { SET_POST_DATA, SET_POST_FEED, SET_POST_LOADING, SET_POST_MY_THREADS, SET_POST_REPLIES, SET_POST_SUCCESS, SET_POST_TEMP, SET_REPLY_REPLIES } from './PostActions';
import { GetFeedAPI, GetPostRepliesAPI, GetPostsOfSignleUserAPI, GetThreadDataAPI, NewThreadAPI } from '../../Utils/Endpoints';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpService, private store: Store<IPostInitialState>, private toast: ToastService) { }

  createNewPost(data: any) {
    this.store.dispatch(SET_POST_LOADING({ loading: true }))
    try {
      this.http.post(NewThreadAPI, data)
        .subscribe((res: any) => {
          this.store.dispatch(SET_POST_LOADING({ loading: false }))
          console.log('res :>> ', res);
          if (res?.Success) {
            this.store.dispatch(SET_POST_SUCCESS({ success: true }))
            this.toast.makeToast("MESSAGE", res?.Message ? res?.Message : "Thread Created.")
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_POST_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  getMyThreads(userId: string, page: number, type: "REPOST" | "PARENT") {
    this.store.dispatch(SET_POST_LOADING({ loading: true }))
    try {
      this.http.get(GetPostsOfSignleUserAPI + userId + "/" + userId + "?type=" + type + "&pageNumber=" + page + "&pageSize=5")
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

  UserId: string | null = null
  getMyFeed(userId: string = "", page: number = 1) {

    if (userId.trim().length > 0) this.UserId = userId

    let id = this.UserId || userId

    this.store.dispatch(SET_POST_LOADING({ loading: true }))
    try {
      // this.http.get(GetFeedAPI + userId + "&pageNumber=" + page + "&pageSize=5")
      this.http.get(GetFeedAPI + id)
        .subscribe((res: any) => {
          this.store.dispatch(SET_POST_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_POST_FEED({ threads: res.Data }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_POST_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  getThreadData(userId: string, threadId: string) {
    this.store.dispatch(SET_POST_LOADING({ loading: true }))
    try {
      this.http.get(GetThreadDataAPI + userId + '/' + threadId)
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

  getThreadReplies(userId: string, threadId: string) {
    this.store.dispatch(SET_POST_LOADING({ loading: true }))
    try {
      this.http.get(GetPostRepliesAPI + userId + '/' + threadId)
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

  getRepliesOfaReply(parentThreadId: string, UserId: string, threadId: string) {
    this.store.dispatch(SET_POST_LOADING({ loading: true }))
    try {
      this.http.get(GetPostRepliesAPI + UserId + "/" + threadId)
        .subscribe((res: any) => {
          this.store.dispatch(SET_POST_LOADING({ loading: false }))

          if (res?.Success) {
            this.store.dispatch(SET_REPLY_REPLIES({ replies: res.Data }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_POST_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  removeRepliesOfReply() {
    this.store.dispatch(SET_REPLY_REPLIES({ replies: [] }))
  }
}
