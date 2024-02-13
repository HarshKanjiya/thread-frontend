import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CarouselComponent } from '../carousel/carousel.component';
import { PostService } from '../../reducers/Post/Post.service';
import { LoaderComponent } from '../loader/loader.component';
import { ChildreplyComponent } from '../childreply/childreply.component';
// import { CarouselComponent, CarouselInnerComponent, CarouselItemComponent } from '@coreui/angular';

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [CarouselComponent, LoaderComponent,ChildreplyComponent],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.scss',
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
export class ReplyComponent {
  @Input() ThreadData: any
  @Input() ParentThreadId: any
  selectedPollOption: any

  UserData: any = null

  loading: boolean = false
  replies: any[] = []
  replyReplies: any[] = []

  @ViewChild("menu") menu !: ElementRef
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.menu.nativeElement.contains(event.target) && this.isOpen) {
      this.setIsOpen()
    }
  }

  constructor(private store: Store<any>, private postService: PostService) { }

  ngOnInit() {
    this.store.select("User").subscribe((res: any) => {
      this.UserData = res.userData
    })
    this.store.select("Post").subscribe((res: any) => {
      this.loading = res.loading
      this.replyReplies = res.replyReplies
    })
  }


  getReplies() {
    this.replyReplies = []
    this.postService.getRepliesOfaReply(this.ParentThreadId, this.ThreadData.ThreadId)
  }
  removeReplies() {
    this.postService.removeRepliesOfReply()
  }


  demoRatings: any = {

    RatingsId: "60cc9ac0-56eb-493a-1fde-08dc288874e8",
    TotalResponse: 15,
    Responses: [
      10,
      5
    ]

  };

  getWidth(total: any, current: any) {
    return (current / total) * 100
  }

  stopPropagation(e: any) {
    e.stopPropagation()
  }

  // ngAfterViewInit() {
  //   console.log('object :>> ', this.ThreadData);
  // }

  isOpen: boolean = false;
  setIsOpen() {
    // e.stopPropagation()

    this.isOpen = !this.isOpen
  }

  timeDifference(createdAt: any): string {
    const currentTime = new Date();
    const createAt = new Date(createdAt);

    const difference = currentTime.getTime() - createAt.getTime();

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours >= 8760) {
      return `${Math.floor(hours / 8760)}y`
    }
    if (hours >= 720 && hours < 8760) {
      return `${Math.floor(hours / 720)}m`
    }
    if (hours >= 24 && hours < 168) {
      return `${Math.floor(hours / 24)}d`
    }
    if (hours > 0 && hours < 24) {
      return `${hours}h`;
    }
    if (hours <= 0 && minutes > 0) {
      return `${minutes}m`;
    }
    if (hours < 0 && minutes < 0) {
      return `${seconds}s`;
    }
    return "1y"
  }


  choseOption(option: any, index: any) {
    console.log('option :>> ', option, this.selectedPollOption, this.demoRatings);
    // this.demoRatings.Responses = this.demoRatings.Responses.map((val: number, ind: number) => {
    //   if (index === ind) {
    //     if (this.selectedPollOption?.OptionId !== option.OptionId) {
    //       return val += 1
    //     }else{
    //       return val  -= 1
    //     }
    //   }
    //   return val
    // }
    // )

    this.demoRatings.Responses = this.demoRatings.Responses.map((val: number, ind: number) => {
      if (this.selectedPollOption) {
        if (ind == index) {

          if (this.selectedPollOption.OptionId === option.OptionId) {
            console.log('POSITION [ repeat ]');
            this.selectedPollOption = null
            return val - 1
          } else {
            this.selectedPollOption = option
            console.log('POSITION [ new choice ]');
            return val + 1
          }
        } else {
          if (this.selectedPollOption.OptionId === option.OptionId) {
            return val
          } else {
            this.selectedPollOption = null
            return val - 1
          }
        }
      } else {
        if (ind == index) {
          console.log('POSITION [ first click ]');
          this.selectedPollOption = option
          return val + 1
        } else {
          return val
        }
      }
    })

    console.log('option :>> ', this.demoRatings.Responses);
  }

  menuClickHandler(type: string) {

    switch (type) {
      case "edit":
        break;
      case "delete":
        break;
      case "report":
        break;
    }

  }
}