import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { CreateReportCategory_AdminAPI, GetAllPackages_AdminAPI, GetConstants_AdminAPI, GetSingleConstant_AdminAPI, SetSingleConstant_AdminAPI, getAllBugReports_AdminAPI, getAllUserReports_AdminAPI, getReportCategories_AdminAPI, getReports_AdminAPI } from '../../Utils/Endpoints';
import { SET_ADMIN_APPEND_CONSTANTS, SET_ADMIN_BUG_REPORT, SET_ADMIN_CONSTANTS, SET_ADMIN_LOADING, SET_ADMIN_PACKAGES, SET_ADMIN_REPORT, SET_ADMIN_REPORT_CATEGORIES, SET_ADMIN_SUCCESS } from './AdminActions';
import { IAdminInitialState } from './AdminTypes';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpService, private store: Store<IAdminInitialState>, private toast: ToastService) { }


  getAllPackages(type: string) {
    this.store.dispatch(SET_ADMIN_LOADING({ loading: true }))
    try {
      this.http.get(GetAllPackages_AdminAPI + type)
        .subscribe((res: any) => {
          this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_ADMIN_PACKAGES({ packages: res.Data }))
          } else {
            this.store.dispatch(SET_ADMIN_PACKAGES({ packages: [] }))

          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
      console.log('Error in getting all packages :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  getConstants() {
    this.store.dispatch(SET_ADMIN_LOADING({ loading: true }))
    try {
      this.http.get(GetConstants_AdminAPI)
        .subscribe((res: any) => {
          this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_ADMIN_CONSTANTS({ constants: res.Data }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
      console.log('Error in getting all constants :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  getSingleConstants(Key: string) {
    this.store.dispatch(SET_ADMIN_LOADING({ loading: true }))
    try {
      this.http.get(GetSingleConstant_AdminAPI + Key)
        .subscribe((res: any) => {
          this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
          if (res?.Success) {
            // this.store.dispatch(SET_ADMIN_CONSTANTS({ constants: res.Data }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
      console.log('Error in geting single constant :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }

  setConstant(data: { Key: string, Value: string }) {
    this.store.dispatch(SET_ADMIN_LOADING({ loading: true }))
    try {
      this.http.post(SetSingleConstant_AdminAPI, data)
        .subscribe((res: any) => {
          this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_ADMIN_SUCCESS({ success: true }))
            this.store.dispatch(SET_ADMIN_APPEND_CONSTANTS({ constant: res.Data }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
      console.log('Error in setting constant :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }


  // reports

  getAllUserReports() {
    this.store.dispatch(SET_ADMIN_LOADING({ loading: true }))
    try {
      this.http.get(getAllUserReports_AdminAPI)
        .subscribe((res: any) => {
          this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_ADMIN_BUG_REPORT({ reports: res.Data }))
          } else {
            this.store.dispatch(SET_ADMIN_PACKAGES({ packages: [] }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
      console.log('Error in getting all user reports :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  getReportCategories() {
    this.store.dispatch(SET_ADMIN_LOADING({ loading: true }))
    try {
      this.http.get(getReportCategories_AdminAPI)
        .subscribe((res: any) => {
          this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_ADMIN_REPORT_CATEGORIES({ reportCategories: res.Data }))
          } else {
            this.store.dispatch(SET_ADMIN_PACKAGES({ packages: [] }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
      console.log('Error in getting all user reports :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  getReports() {
    this.store.dispatch(SET_ADMIN_LOADING({ loading: true }))
    try {
      this.http.get(getReports_AdminAPI)
        .subscribe((res: any) => {
          this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_ADMIN_REPORT({ reports: res.Data }))
          } else {
            this.store.dispatch(SET_ADMIN_PACKAGES({ packages: [] }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
      console.log('Error in getting all user reports :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
  getBugReports() {
    this.store.dispatch(SET_ADMIN_LOADING({ loading: true }))
    try {
      this.http.get(getAllBugReports_AdminAPI)
        .subscribe((res: any) => {
          this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
          if (res?.Success) {
            this.store.dispatch(SET_ADMIN_BUG_REPORT({ reports: res.Data }))
          } else {
            this.store.dispatch(SET_ADMIN_PACKAGES({ packages: [] }))
          }
        })
    } catch (e: any) {
      this.store.dispatch(SET_ADMIN_LOADING({ loading: false }))
      console.log('Error in getting all user reports :', e.loading);
      this.toast.makeToast('ERROR', "Something went Wrong")
    }
  }
}
