export interface IPostInitialState {
  userData: Object | null,
  loading: boolean,
  success: boolean,
  message: string | null,
  temp: any
}
export const PostInitialState: IPostInitialState = {
  userData: null,
  loading: false,
  success: false,
  message: null,
  temp: null
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
