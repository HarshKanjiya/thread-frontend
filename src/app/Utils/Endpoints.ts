
export const BaseURL = "https://localhost:7210/api/"

// Auth
export const LoginAPI = "auth/login" // POST
export const RegisterAPI = "auth/register" // POST
export const LogOutAPI = "auth/signout" // GET
export const CheckUserNameAPI = "auth/check/" // + USERNAME // GET
export const GetNewAccessTokenAPI = "auth/token" // GET
export const GetSessionDataAPI = "auth/session"

//Otp
export const SendOtoAPI = "otp/create" // POST
export const VerifyOtoAPI = "otp/verify" // POST

// Profile
export const UpdateProfileAPI = "auth/user/" // + USER_ID // PUT
export const UpdatePasswordAPI = "auth/user/pass/" // + USER_ID // PUT
export const GetUserPRofileAPI = "auth/user/"  // + USERNAME // GET

// Thread
export const NewThreadAPI = "thread" // POST
export const DeleteThreadAPI = "thread/" // + USER_ID + THREAD_ID // DELETE
export const VotePollAPI = "poll" // POST
export const GetThreadDataAPI = ""
export const EditThreadAPI = ""

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
export const GetAllPackages_AdminAPI = "package/admin" // GET
export const GetPackageById_AdminAPI = "package/admin/" // + PACKAGE_ID // GET
export const AddPackage_AdminAPI = "package/admin" // POST
export const UpdatePackage_AdminAPI = "package/admin" // PUT
export const DeletePackage_AdminAPI = "package/admin" // DELETE