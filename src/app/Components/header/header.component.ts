import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DialogService } from '../../Services/dialog.service';
import { ThemeService } from '../../Services/theme.service';
import { CreatePostComponent } from '../create-post/create-post.component';
import { CreatePostPopUpComponent } from '../createPost-popUp/create-post-pop-up.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CreatePostPopUpComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userName: string = "@harxh_here"

  visible: boolean = false;


  constructor(private themeService: ThemeService, private activatedRoute: ActivatedRoute, public router: Router, public dialog: DialogService) {
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
