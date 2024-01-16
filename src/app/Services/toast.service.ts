import { Injectable } from '@angular/core';
import Toast from 'awesome-toast-component'
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private theme: ThemeService) { }

  makeToast(type: "WARN" | "MESSAGE" | "ERROR", message: string) {
    let bgColor = "#fff"
    let txtColor = "#101010"
    let borderColor = "rgb(63 63 70)"

    if (this.theme.darkTheme() !== true) {
      bgColor = "#101010"
      txtColor = "#fff"
      borderColor = "rgb(63 63 70)"
    }

    switch (type) {
      case "WARN":
        bgColor = "#edc939"
        break
      case "ERROR":
        bgColor = "#ff2e3a"
        break
    }

    new Toast(message, {
      style: {
        container: [
          ['background-color', bgColor],
          ['border', '1px solid ' + borderColor],
          ['box-shadow', 'box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;']
        ],
        message: [
          ['color', txtColor],
        ]
      }
    })
  }
}
