import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import {
  ActionDataSocket_API,
  ReportsDataSocket_API,
  postDataSocket_API,
  userDataSocket_API,
} from '../Utils/Endpoints';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  // admin
  private notificationConnection!: HubConnection;

  private startNotifConnection = () => {
    this.userConnection = new HubConnectionBuilder()
      .withUrl(userDataSocket_API)
      .build();
    this.userConnection
      .start()
      .then(() => console.log('Notif connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  private addNotifDataListener = () => {
    this.userConnection.on('[TRANSFER] NotifData', (data: any) => {
      console.log(data);
    });
  };

  // admin
  private userConnection!: HubConnection;
  private postConnection!: HubConnection;
  private actionConnection!: HubConnection;
  private reportConnection!: HubConnection;

  public UserSocketConnection() {
    this.startNotifConnection();
    this.addNotifDataListener();
  }
  public AdminSocketConnection() {
    this.startUserConnection();
    this.addUserDataListener();

    this.startPostConnection();
    this.addPostDataListener();

    this.startActionConnection();
    this.addActionDataListener();

    this.startReportConnection();
    this.addReportDataListener();
  }

  private startUserConnection = () => {
    this.userConnection = new HubConnectionBuilder()
      .withUrl(userDataSocket_API)
      .build();
    this.userConnection
      .start()
      .then(() => console.log('User Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
  private addUserDataListener = () => {
    this.userConnection.on('[TRANSFER] userData', (data: any) => {
      console.log(data);
    });
  };

  private startPostConnection = () => {
    this.userConnection = new HubConnectionBuilder()
      .withUrl(postDataSocket_API)
      .build();
    this.userConnection
      .start()
      .then(() => console.log('Post connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
  private addPostDataListener = () => {
    this.userConnection.on('[TRANSFER] postData', (data: any) => {
      console.log(data);
    });
  };

  private startActionConnection = () => {
    this.userConnection = new HubConnectionBuilder()
      .withUrl(ActionDataSocket_API)
      .build();
    this.userConnection
      .start()
      .then(() => console.log('Action connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
  private addActionDataListener = () => {
    this.userConnection.on('[TRANSFER] actionData', (data: any) => {
      console.log(data);
    });
  };

  private startReportConnection = () => {
    this.userConnection = new HubConnectionBuilder()
      .withUrl(ReportsDataSocket_API)
      .build();
    this.userConnection
      .start()
      .then(() => console.log('Report connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
  private addReportDataListener = () => {
    this.userConnection.on('[TRANSFER] reportData', (data: any) => {
      console.log(data);
    });
  };
}
