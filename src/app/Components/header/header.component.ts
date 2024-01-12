import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DialogService } from '../../Services/dialog.service';
import { ThemeService } from '../../Services/theme.service';
import { CreatePostPopUpComponent } from '../createPost-popUp/create-post-pop-up.component';
import { DropdownComponent } from '../../UI/dropdown/dropdown/dropdown.component';
import { animate, style, transition, trigger } from '@angular/animations';
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

  isOpen: boolean = true

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;




  constructor(private themeService: ThemeService, private activatedRoute: ActivatedRoute, public router: Router, public dialog: DialogService, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      console.log("click");


      if (e.target !== this.toggleButton.nativeElement && e.target !== this.menu.nativeElement) {
        console.log("click outside");
        this.isOpen = false;
      }
    });
  }


  setIsOpen() {
    this.isOpen = !this.isOpen
    console.log('object :>> ', this.isOpen);
  }

  menuClickHandler(item: string) {
    console.log('item :>> ', item);
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
}
