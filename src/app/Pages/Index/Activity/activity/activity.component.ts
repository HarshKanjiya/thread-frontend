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
}
