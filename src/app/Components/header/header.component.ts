import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DialogService } from '../../Services/dialog.service';
import { ThemeService } from '../../Services/theme.service';
import { DropdownComponent } from '../../UI/dropdown/dropdown/dropdown.component';
import { CreatePostPopUpComponent } from '../createPost-popUp/create-post-pop-up.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CreatePostPopUpComponent, DropdownComponent],
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
    ])
  ]
})
export class HeaderComponent {

  userName: string = "@harxh_here"

  visible: boolean = false;

  isOpen: boolean = false


  @ViewChild("menu") menu !: ElementRef
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.menu.nativeElement.contains(event.target) && this.isOpen) {
      // Clicked outside the element, handle it here
      this.setIsOpen()
    }
  }


  constructor(private themeService: ThemeService, public router: Router, public dialog: DialogService, private location: Location) { }


  setIsOpen() {
    this.isOpen = !this.isOpen
  }

  menuClickHandler(val: string) {

    switch (val) {
      case 'theme':
        this.changeTheme()
        break
      case 'setting':
        break
      case 'about':
        break
      case 'report':
        break
      case 'logout':
        break
    }

    this.setIsOpen()

  }

  showDialog() {
    this.visible = !this.visible;
  }

  changeTheme() {
    this.themeService.darkTheme.set(!this.themeService.darkTheme())
  }

  openDialog() {
    this.dialog.dialogVisible.set(true)
  }

  removePopUp() {
    this.dialog.dialogVisible.set(false)
  }

  BackButtonClick() {

    this.location.back()
    this.removePopUp()

  }

}
