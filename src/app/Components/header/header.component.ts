import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TextareaAutoresizeDirective } from '../../Directives/textarea-autoresize.directive';
import { DialogService } from '../../Services/dialog.service';
import { ThemeService } from '../../Services/theme.service';
import { DropdownComponent } from '../../UI/dropdown/dropdown/dropdown.component';
import { CreatePostPopUpComponent } from '../createPost-popUp/create-post-pop-up.component';
import { CustomPopupComponent } from '../custom-popup/custom-popup.component';
import { UserService } from '../../reducers/User/User.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CreatePostPopUpComponent, DropdownComponent, CustomPopupComponent, TextareaAutoresizeDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger("dropBody", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-20px)" }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 1, transform: "translateY(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateY(0)" }),
        animate(
          "150ms ease-in-out",
          style({ opacity: 0, transform: "translateY(-20px)" })
        )
      ])
    ]),

  ]
})
export class HeaderComponent {

  userName: string = ""

  visible: boolean = false;
  backButtonVisibility: boolean = false
  isOpen: boolean = false

  loading: boolean = false


  @ViewChild("menu") menu !: ElementRef
  @ViewChild("mobileMenu") mobileMenu !: ElementRef
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.menu.nativeElement.contains(event.target) && !this.mobileMenu.nativeElement.contains(event.target) && this.isOpen) {
      // Clicked outside the element, handle it here
      this.setIsOpen()
    }
  }


  constructor(private themeService: ThemeService, public router: Router, public dialog: DialogService, private location: Location, private store: Store<any>, private userService: UserService) {

    store.select("User").subscribe((res: any) => {
      if (res?.userData) {
        this.userName = res.userData.UserName
      }
    })

    this.router.events.subscribe(
      (ev) => {
        if (ev instanceof NavigationEnd) {
          if (["/", "/search", "/activity"].indexOf(ev.url) > -1 || router.url.indexOf("user") > -1) {
            this.backButtonVisibility = false
          } else {
            this.backButtonVisibility = true
          }
        }
      }
    )
  }


  setIsOpen() {
    this.isOpen = !this.isOpen
  }



  menuClickHandler(val: string) {

    switch (val) {
      case 'theme':
        this.changeTheme();
        this.setIsOpen()
        break
      case 'report':
        this.dialog.openDialog("REPORT_BUG")
        this.setIsOpen()
        break
      case 'logout':
        this.userService.signOut()
    }
  }

  showDialog() {
    this.visible = !this.visible;
  }

  changeTheme() {
    this.themeService.darkTheme.set(!this.themeService.darkTheme())
  }

  openDialog() {
    this.dialog.openDialog("CREATE_THREAD")
  }

  removePopUp() {
    this.dialog.closeDialog()
  }

  BackButtonClick() {

    this.location.back()
    this.removePopUp()

  }

}
