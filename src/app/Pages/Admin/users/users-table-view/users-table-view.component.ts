import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, QueryList, Signal, SimpleChanges, ViewChild, ViewChildren, computed, signal } from '@angular/core';
import { LoaderComponent } from '../../../../Components/loader/loader.component';
import { NoDataFoundComponent } from '../../../util/no-data-found/no-data-found.component';
import { Router } from '@angular/router';

export enum FilterTypes {
  USER_AC,
  USER_DC,
  USER_DEFAULT,
  USER_DEFAULT_REVERSE,
  REPO_AC,
  REPO_DC,
  REPO_DEFAULT
}

@Component({
  selector: 'app-users-table-view',
  standalone: true,
  imports: [LoaderComponent, NoDataFoundComponent],
  templateUrl: './users-table-view.component.html',
  animations: [
    trigger("initAnim", [
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
          style({ opacity: 0, transform: "translateY(20px)" })
        )
      ])
    ]),
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
export class UsersTableViewComponent {
  @Input() orignalData: any[] = []
  @Input() loading: boolean = false

  // @ViewChildren("menu") menus !: QueryList<any>
  @ViewChild("sortingMenu") menu2 !: ElementRef
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {


    if (!this.menu2.nativeElement.contains(event.target)) {
      this.filterSelector = ""
    }
  }

  constructor(private router: Router) { }

  data: any = []
  isOpen: boolean = false
  selectedItem: any = null
  filterSelector: "user" | "ban" | "" = ""

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orignalData']) {
      this.filterData(FilterTypes.USER_AC)
    }
  }

  public get FilterTypes(): typeof FilterTypes {
    return FilterTypes;
  }

  format: FilterTypes = FilterTypes.USER_AC

  filterData(type: FilterTypes) {
    this.filterSelector = ""
    let temp = []
    switch (type) {
      case FilterTypes.USER_AC:
        temp = [...this.orignalData].sort((a, b) => a.UserName.localeCompare(b.UserName))
        this.data = temp
        break;
      case FilterTypes.USER_DC:
        temp = [...this.orignalData].sort((a, b) => b.UserName.localeCompare(a.UserName))
        this.data = temp
        break;
      case FilterTypes.USER_DEFAULT:
        this.data = [...this.orignalData]
        break;
      case FilterTypes.USER_DEFAULT_REVERSE:
        this.data = [...this.orignalData].reverse()
        break;
      case FilterTypes.REPO_AC:
        temp = [...this.orignalData].sort((a, b) => a?.reports - b?.reports)
        this.data = temp
        break;
      case FilterTypes.REPO_DC:
        temp = [...this.orignalData].sort((a, b) => b?.reports - a?.reports)
        this.data = temp
        break;
      case FilterTypes.REPO_DEFAULT:
        this.data = [...this.orignalData]
        break;
    }
  }

  actionmenuClickHandler(item: any) {
    if (this.selectedItem) {
      if (this.selectedItem == item.UserId) {
        this.selectedItem = null
      } else {
        this.selectedItem = item.UserId
      }
    } else {
      this.selectedItem = item.UserId
    }
  }

  menuClickHandler(type: string) {
    switch (type) {
      case "profile":
        this.router.navigate(['admin/users', this.selectedItem])
        break;
      case "ban":
        break;
    }
    this.isOpen = false
  }
}
