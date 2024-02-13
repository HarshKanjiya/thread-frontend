import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CarouselComponent } from '../carousel/carousel.component';
// import { CarouselComponent, CarouselInnerComponent, CarouselItemComponent } from '@coreui/angular';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [CarouselComponent, RouterLink],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.scss',
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
export class ThreadComponent {
  @Input() ThreadData: any
  selectedPollOption: any

  likeCount: number = 0;
  liked: boolean = false

  ratings: any = null

  UserData: any = null

  constructor(private store: Store<any>) {
    store.select("User").subscribe((res: any) => {
      this.UserData = res.userData
    })
  }

  @ViewChild("menu") menu !: ElementRef
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.menu.nativeElement.contains(event.target) && this.isOpen) {
      this.setIsOpen()
    }
  }

  ngOnInit() {
    if (this.ThreadData.Content.Ratings) {
      this.ratings = { ...this.ThreadData.Content.Ratings }
    }
    if (this.ThreadData?.ThreadId === "e8d70163-8d1e-42d8-8cb4-08dc2888547a") {
      console.log('ThreadData :>> ', this.ratings);
    }

  }


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
    console.log('option :>> ', option, this.selectedPollOption, this.ratings);
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

    this.ratings.Responses = this.ratings.Responses.map((val: number, ind: number) => {
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

    console.log('option :>> ', this.ratings.Responses);
  }


  likeThread(e: any) {
    e.stopPropagation()
    this.liked ? this.likeCount-- : this.likeCount++;
    this.liked = !this.liked;
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
