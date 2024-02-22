
export const BaseURL = "https://localhost:7210/api/"

// Auth
export const LoginAPI = "auth/login" // POST //& DONE
export const RegisterAPI = "auth/register" // POST //& DONE
export const LogOutAPI = "auth/signout" // GET //& DONE
export const CheckUserNameAPI = "auth/check/" // + USERNAME // GET //& DONE
export const GetNewAccessTokenAPI = "auth/token" // GET
export const GetSessionDataAPI = "auth/session" //& DONE

//Otp
export const SendOtpAPI = "otp/create" // POST //& DONE
export const VerifyOtpAPI = "otp/verify" // POST //& DONE

// Profile
export const UpdateProfileAPI = "auth/user/" // + USER_ID // PUT
export const UpdatePasswordAPI = "auth/user/pass/" // + USER_ID // PUT
export const GetUserPRofileAPI = "auth/user/"  // + USERNAME // GET //& DONE

// user search
export const SearchUserAPI = "auth/search/"

// Thread
export const NewThreadAPI = "thread" // POST
export const DeleteThreadAPI = "thread/" // + USER_ID + THREAD_ID // DELETE
export const VotePollAPI = "thread/poll" // POST
export const GetThreadDataAPI = "thread/" // + THREAD_ID // GET
export const GetPostRepliesAPI = "thread/replies/" // + THREAD_ID // GET
export const GetFeedAPI = "thread/feed/" // + USER_ID // GET
export const EditThreadAPI = ""
export const GetPostsOfSignleUserAPI = "thread/user/" // + USER_ID // GET

// Action // POST
export const LikeAPI = "action/like"
export const FollowAPI = "action/follow"
export const MuteAPI = "action/mute"
export const BlockAPI = "action/block"


// Notification
export const GetMyNotifAPI = "notification/getall/" // + USERID // GET
export const MarkAsDoneNotifAPI = "notification/markseen" // POST // Pass Array of Notifs Ids
export const DeleteNotifAPI = ""

// Packages
export const GetActivePackagesAPI = "packages" // GET
export const GetPackageByIdAPI = "packages/" // PACKAGE_ID // GET
export const InitPaymentAPI = "buy/init" // POST

// Admin
export const GetAllPackages_AdminAPI = "packages/admin/all/" // GET
export const GetPackageById_AdminAPI = "packages/admin/" // + PACKAGE_ID // GET
export const AddPackage_AdminAPI = "packages/admin" // POST
export const UpdatePackage_AdminAPI = "packages/admin" // PUT
export const DeletePackage_AdminAPI = "packages/admin" // DELETE

export const GetConstants_AdminAPI = "admin/env"
export const GetSingleConstant_AdminAPI = "admin/env/"
export const DeleteConstant_AdminAPI = "admin/env/"
export const SetSingleConstant_AdminAPI = "admin/env"
export const UpdateSingleConstant_AdminAPI = "admin/env/new"
