import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  dialogVisible = signal<'PRIVATE_ACCOUNT' | 'MENTION_ACCESS' | 'CREATE_THREAD' | 'REPORT_BUG' | 'TEMP' | ''>('')

  openDialog(dialogType: 'PRIVATE_ACCOUNT' | 'MENTION_ACCESS' | 'CREATE_THREAD' | 'REPORT_BUG' | 'TEMP' | '') {
    document.body.classList.add('modal-open');
    this.dialogVisible.set(dialogType)
  }
  closeDialog() {
    document.body.classList.remove('modal-open');
    this.dialogVisible.set("")
  }

}
