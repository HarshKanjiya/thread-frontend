import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { IPackagesInitialState } from './PackageTypes';
import { SET_PACKAGES, SET_PACKAGE_DATA, SET_PACKAGE_LOADING } from './PackageActions';
import { GetActivePackagesAPI, GetAllPackages_AdminAPI, GetPackageByIdAPI } from '../../Utils/Endpoints';


@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpService, private store: Store<IPackagesInitialState>, private toast: ToastService) { }

  createNewPost() {

  }


  getActivePackages() {
    this.store.dispatch(SET_PACKAGE_LOADING({ loading: true }))
    try {
      this.http.get(GetActivePackagesAPI)
        .subscribe((res: any) => {
          this.store.dispatch(SET_PACKAGE_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_PACKAGES({ packages: res.Data }))
          }
        })

    } catch (e: any) {
      this.store.dispatch(SET_PACKAGE_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  GetPackageData(PackageId: string) {
    this.store.dispatch(SET_PACKAGE_LOADING({ loading: true }))
    try {
      this.http.get(GetPackageByIdAPI + PackageId)
        .subscribe((res: any) => {
          this.store.dispatch(SET_PACKAGE_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_PACKAGE_DATA({ packageData: res.Data }))
          }
        })

    } catch (e: any) {
      this.store.dispatch(SET_PACKAGE_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  InitPayment() { }


  //! ADMIN

  ADMIN_getAllPackages() {
    this.store.dispatch(SET_PACKAGE_LOADING({ loading: true }))
    try {
      this.http.get(GetAllPackages_AdminAPI)
        .subscribe((res: any) => {
          this.store.dispatch(SET_PACKAGE_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_PACKAGE_DATA({ packageData: res.Data }))
          }
        })

    } catch (e: any) {
      this.store.dispatch(SET_PACKAGE_LOADING({ loading: false }))
      console.log('Error in Login :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  ADMIN_getAllPackageData() { }
  ADMIN_AddPackage() { }
  ADMIN_UpdatePackage() { }
  ADMIN_DeletePackage() { }
}
