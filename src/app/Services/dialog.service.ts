import { Injectable, SimpleChanges, signal } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  dialogVisible = signal<'PRIVATE_ACCOUNT' | 'MENTION_ACCESS' | 'CREATE_THREAD' | ''>('MENTION_ACCESS')

  openDialog(dialogType: 'PRIVATE_ACCOUNT' | 'MENTION_ACCESS' | 'CREATE_THREAD' | '') {
    document.body.classList.add('modal-open');
    this.dialogVisible.set(dialogType)
  }
  closeDialog() {
    document.body.classList.remove('modal-open');
    this.dialogVisible.set("")
  }

}
