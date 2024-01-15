import { Component } from '@angular/core';


@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {



  data: any = [
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "FOLLOW",
      verifiedSender: true
    },
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "REPLY",
      verifiedSender: false
    }
    ,
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "MENTION",
      verifiedSender: false
    }, {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "FOLLOW",
      verifiedSender: true
    },
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "REPLY",
      verifiedSender: false
    }
    ,
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "MENTION",
      verifiedSender: false
    }, {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "FOLLOW",
      verifiedSender: true
    },
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "REPLY",
      verifiedSender: false
    }
    ,
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "MENTION",
      verifiedSender: false
    }, {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "FOLLOW",
      verifiedSender: true
    },
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "REPLY",
      verifiedSender: false
    }
    ,
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "MENTION",
      verifiedSender: false
    }, {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "FOLLOW",
      verifiedSender: true
    },
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "REPLY",
      verifiedSender: false
    }
    ,
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "MENTION",
      verifiedSender: false
    }, {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "FOLLOW",
      verifiedSender: true
    },
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "REPLY",
      verifiedSender: false
    }
    ,
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "MENTION",
      verifiedSender: false
    }, {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "FOLLOW",
      verifiedSender: true
    },
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "REPLY",
      verifiedSender: false
    }
    ,
    {
      avatar: "https://i.pinimg.com/736x/74/2f/d5/742fd5a3639902802e8535953fd2c920.jpg",
      username: "harxh_here",
      id: "",
      createAt: new Date(1705123020291),
      message: "",
      type: "MENTION",
      verifiedSender: false
    },
  ]

  getTimePassed(createdAt: Date) {
    console.log('createAt :>> ', createdAt, Date.now());

    // @ts-ignore
    return (Date.now() - createdAt).toLocaleString()
  }


  timeDifference(createAt: any): string {
    const currentTime = new Date();
    const difference = currentTime.getTime() - createAt.getTime();

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }
}
