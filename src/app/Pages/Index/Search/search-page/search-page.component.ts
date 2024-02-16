import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {

  input=""

  feedData : any = [
    {
      avatar:"https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username:"harxh_here",
      name:"harsh kanjiya",
      followersCount: 5000000,
      verified:true,
      amIFollowing:true,
      friendsFollowing:[
        'https://pbs.twimg.com/media/ElhZ-EIWkAAQ_ZL.jpg',"https://pbs.twimg.com/media/ElhZ-EIWkAAQ_ZL.jpg"
      ]
    },
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      name: "harsh kanjiya",
      followersCount: 5000000,
      verified: true,
      amIFollowing: true,
      friendsFollowing: [
        'https://pbs.twimg.com/media/ElhZ-EIWkAAQ_ZL.jpg', "https://pbs.twimg.com/media/ElhZ-EIWkAAQ_ZL.jpg"
      ]
    }
  ]

}
