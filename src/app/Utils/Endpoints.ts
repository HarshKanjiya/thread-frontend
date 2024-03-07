
export const BaseURL = "https://localhost:7210/api/"

// Auth
export const LoginAPI = "auth/login" // POST //& DONE
export const RegisterAPI = "auth/register" // POST //& DONE
export const LogOutAPI = "auth/signout" // GET //& DONE
export const CheckUserNameAPI = "auth/check/" // + USERNAME // GET //& DONE
export const GetNewAccessTokenAPI = "auth/token" // GET  //& DONE
export const GetSessionDataAPI = "auth/session" //& DONE


//Otp
export const SendOtpAPI = "otp/create" // POST //& DONE
export const VerifyOtpAPI = "otp/verify" // POST //& DONE

// Profile
export const UpdateProfileAPI = "auth/user/" // + USER_ID // PUT
export const UpdatePasswordAPI = "auth/user/pass/" // + USER_ID // PUT
export const GetUserPRofileAPI = "auth/user/"  // + USERNAME // GET //& DONE

// user search
export const SearchUserAPI = "auth/search" //& DONE

// Thread
export const NewThreadAPI = "thread" // POST //& DONE
export const DeleteThreadAPI = "thread/" // + USER_ID + THREAD_ID // DELETE
export const VotePollAPI = "thread/poll" // POST
export const GetThreadDataAPI = "thread/" // + THREAD_ID // GET //& DONE
export const GetPostRepliesAPI = "thread/replies/" // + THREAD_ID // GET //& DONE
export const GetFeedAPI = "thread/feed/" // + USER_ID // GET //& DONE
export const EditThreadAPI = ""
export const GetPostsOfSignleUserAPI = "thread/user/" // + USER_ID // GET //& DONE

// Action // POST
export const LikeAPI = "action/like" //& DONE
export const FollowAPI = "action/follow"
export const MuteAPI = "action/mute"
export const BlockAPI = "action/block"


// Notification
export const GetMyNotifAPI = "notification/getall/" // + USERID // GET  //& DONE
export const MarkAsDoneNotifAPI = "notification/markseen" // POST // Pass Array of Notifs Ids
export const DeleteNotifAPI = ""

// Packages
export const GetActivePackagesAPI = "packages" // GET
export const GetPackageByIdAPI = "packages/" // PACKAGE_ID // GET
export const InitPaymentAPI = "buy/init" // POST

// Admin
export const GetAllPackages_AdminAPI = "packages/admin/all/" // GET //& DONE
export const GetPackageById_AdminAPI = "packages/admin/" // + PACKAGE_ID // GET //& DONE
export const AddPackage_AdminAPI = "packages/admin" // POST
export const UpdatePackage_AdminAPI = "packages/admin/" // PUT
export const DeletePackage_AdminAPI = "packages/admin" // DELETE

export const GetConstants_AdminAPI = "admin/env" //& DONE
export const GetSingleConstant_AdminAPI = "admin/env/" //& DONE
export const DeleteConstant_AdminAPI = "admin/env/" //& DONE
export const SetSingleConstant_AdminAPI = "admin/env" //& DONE
export const UpdateSingleConstant_AdminAPI = "admin/env/new" //& DONE

export const getReports_AdminAPI = "admin/reports"  //& DONE
export const getAllUserReports_AdminAPI = "admin/reports/users"  //& DONE
export const getAllBugReports_AdminAPI = "admin/reports/bugs"  //& DONE
export const getReportCategories_AdminAPI = "admin/reports/category"  //& DONE
export const CreateReport_AdminAPI = "admin/report/"  //& DONE
export const CreateReportCategory_AdminAPI = "admin/report/category/"  //& DONE

export const getUsers_AdminAPI = "auth/admin/users/"  //& DONE
export const getSingleUser_AdminAPI = "auth/admin/user/"
