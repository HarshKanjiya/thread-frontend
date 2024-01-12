import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
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
export class DropdownComponent {
  @Input() label!: string
  @Input() opnerClass!: string
  @Input() itemsClass!: string
  @Input() Options!: string[]
  @Input() OptionsMap!: any
  @Input() icon: boolean = true


  @Output() selectedOption = new EventEmitter<any>()
  isOpen: boolean = false

  setIsOpen() {
    this.isOpen = !this.isOpen;
  }

  clickHandler(value: string) {
    this.setIsOpen();

    this.selectedOption.emit({ label: value, code: this.OptionsMap[value] })
  }
}
