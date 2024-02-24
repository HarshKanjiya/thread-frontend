export interface IPostInitialState {
  loading: boolean,
  success: boolean,
  message: string | null,

  myThreads: any[],
  feed: any[],

  temp: any,

  threadData: any,
  threadReplies: any[],
  replyReplies: any[]
}
export const PostInitialState: IPostInitialState = {
  loading: false,
  success: false,
  message: null,
  myThreads: [],
  feed: [],
  temp: null,
  threadData: null,
  threadReplies: [],
  replyReplies: []
}


export interface INewPostData {
  Type: "PARENT" | "REPLY" | "REPOST",
  ReferenceId: string,
  ReplyAccess: "ANY" | "MENTIONED" | "NONE",
  Content: IPostContent
}
export interface IPostContent {
  ContentType: "TEXT" | "POLL"
  Text: string,
  Files: string[],
  Options: IPostContentOption[]
}
export interface IPostContentOption {
  Option: string
}


export interface IEditPostData {
  ThreadId: string,
  Type: "PARENT" | "REPLY" | "REPOST",
  ReferenceId: string,
  ReplyAccess: "ANY" | "MENTIONED" | "NONE",
  Content: IPostContent
}
export interface IDeletePost {
  ThreadId: string,
  UserId: string,
}
