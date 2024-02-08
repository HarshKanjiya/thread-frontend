import { Injectable, signal } from '@angular/core';
import { ToastService } from '../toast.service';
import { HttpService } from '../http-service.service';
import { GetThreadDataAPI } from '../../Utils/Endpoints';

@Injectable({
  providedIn: 'root'
})
export class PostsStateService {

  constructor(private toast: ToastService, private http: HttpService) { }

  loading = signal<boolean>(false)
  success = signal<boolean>(false)

  postData = signal<any>(null)
  postRepliesData = signal<any>(null)

  MyPosts = signal<any[]>([])
  OthersPosts = signal<any[]>([])

  message = signal<string | null>(null)
  temp = signal<any>(null)


  getThreadData(id: string) {
    this.loading.set(true);
    try {

      this.http.get(GetThreadDataAPI + id).subscribe((res: any) => {
        this.loading.set(false)
        if (res.Success) {
          this.postData.set(res.Data)
        }
      })

    } catch (err: any) {
      this.loading.set(false)

    }
  }

}
