import { HostBinding, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkTheme = signal<boolean>(false)

}
