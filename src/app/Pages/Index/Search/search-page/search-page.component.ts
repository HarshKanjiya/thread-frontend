import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { UserActionService } from '../../../../reducers/UserAction/UserAction.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {

  input = ""
  feedData: any[] = []
  loading: boolean = false

  private typingSubject = new Subject<string>();
  private typingSubscription: Subscription;

  constructor(private ActionService: UserActionService, private store: Store<any>) {
    this.typingSubscription = this.typingSubject.pipe(
      debounceTime(1000) // Adjust the debounce time as needed (e.g., 1000ms = 1 second)
    ).subscribe(value => {
      //fetch
      this.ActionService.SearchUserProfiles(this.input)
    });

    this.store.select("Action").subscribe((res: any) => {
      this.loading = res.loading
      this.feedData = res.searchResults || []
    })

  }

  ngOnInit() {
    this.ActionService.SearchUserProfiles(this.input)
  }

  inputOnChange(e: any) {
    this.typingSubject.next(e.target.value);
  }
  ngOnDestroy(): void {
    // Unsubscribe from the subject to prevent memory leaks
    this.typingSubscription.unsubscribe();
  }

}
