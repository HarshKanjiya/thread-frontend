export interface INotification{
  NotificationId: string,
  ReceiverId: string,
  CasterId: string,
  CasterUserName: string,
  CasterAvatarUrl: string,
  HelperId: string,
  CreatedAt: Date,
  Type: "MENTION" | "REPLY" | "LIKE" | "FOLLOW" | "REPOST",
  verifiedSender?: false,
  Seen:boolean
}
