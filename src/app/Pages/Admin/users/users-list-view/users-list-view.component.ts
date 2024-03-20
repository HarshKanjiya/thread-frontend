import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NoDataFoundComponent } from '../../../util/no-data-found/no-data-found.component';
import { FilterTypes } from '../users-table-view/users-table-view.component';

@Component({
  selector: 'app-users-list-view',
  standalone: true,
  templateUrl: './users-list-view.component.html',
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
  ],
  imports: [NoDataFoundComponent]
})
export class UsersListViewComponent {
  @Input() orignalData: any[] = []

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

  menuClickHandler(type: string) {
    switch (type) {
      case "profile":
        this.router.navigate(['admin/users', this.selectedItem.UserId])
        break;
      case "ban":
        break;
    }
    this.isOpen = false
  }

}
