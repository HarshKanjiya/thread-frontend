import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { IPackagesInitialState } from './PackageTypes';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpService, private store: Store<IPackagesInitialState>, private toast: ToastService) { }

  createNewPost() {

  }

  // getMyThreads(userId: string, page: number, type: "REPOST" | "PARENT") {
  //   this.store.dispatch(SET_POST_LOADING({ loading: true }))
  //   try {
  //     this.http.get(GetPostsOfSignleUserAPI + userId + "?type=" + type + "&pageNumber=" + page + "&pageSize=5")
  //       .subscribe((res: any) => {
  //         this.store.dispatch(SET_POST_LOADING({ loading: false }))

  //         if (res?.Success) {
  //           this.store.dispatch(SET_POST_MY_THREADS({ threads: res.Data }))
  //         }
  //       })
  //   } catch (e: any) {
  //     this.store.dispatch(SET_POST_LOADING({ loading: false }))
  //     console.log('Error in Login :', e.loading);
  //     this.toast.makeToast('ERROR', "Something went Wrong")
  //   }
  // }

  getActivePackages() { }
  GetPackageData() { }
  InitPayment() { }


  //! ADMIN

  ADMIN_getAllPackages() { }
  ADMIN_getAllPackageData() { }
  ADMIN_AddPackage() { }
  ADMIN_UpdatePackage() { }
  ADMIN_DeletePackage() { }
}
