import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../Services/http-service.service';
import { ToastService } from '../../Services/toast.service';
import { IPostInitialState } from './PostTypes';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpService, private store: Store<IPostInitialState>, private toast: ToastService) { }

  createNewPost(){

  }

}
