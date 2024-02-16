export interface IUserActionInitialState {
  loading: boolean,
  success: boolean,
  message: string | null,
  temp: any,
  searchResults:any[]

}
export const UserActionInitialState: IUserActionInitialState = {
  loading: false,
  success: false,
  message: null,

  temp: null,
  searchResults:[]
}

export interface ILikeThreadAction {
  UserId: string
  ThreadId: string
  Status: "LIKE" | "DISLIKE"
}

export interface IAddPollResponseAction {
  UserId: string
  ThreadId: string
  OptionId: string
}

export interface IUserRelationAction {
  CasterId: string
  ReceiverId: string
  Type: 'FOLLOW' | 'UNFOLLOW' | 'BLOCK' | 'UNBLOCK' | 'MUTE' | 'UNMUTE'
}
