import { Routes } from '@angular/router';
import { AdminComponent } from './Pages/Admin/admin.component';
import { BugReportsComponent } from './Pages/Admin/bug-reports/bug-reports.component';
import { ConstantsComponent } from './Pages/Admin/constants/constants.component';
import { AdminHomeComponent } from './Pages/Admin/dashboard/admin-home.component';
import { PackagesComponent } from './Pages/Admin/packages/packages.component';
import { SettingComponent } from './Pages/Admin/setting/setting.component';
import { AdminSubscriptionsComponent } from './Pages/Admin/subscription/admin-subscriptions.component';
import { ReportsConfigComponent } from './Pages/Admin/user-reports config/reports-config.component';
import { UserReportsComponent } from './Pages/Admin/user-reports/user-reports.component';
import { UsersComponent } from './Pages/Admin/users/users.component';
import { LoginPageComponent } from './Pages/Auth/login-page/login-page.component';
import { SignUpPageComponent } from './Pages/Auth/sign-up-page/sign-up-page.component';
import { ActivityComponent } from './Pages/Index/Activity/activity/activity.component';
import { HomePageComponent } from './Pages/Index/Home/home-page/home-page.component';
import { ProfilePageComponent } from './Pages/Index/Profile/profile-page.component';
import { SearchPageComponent } from './Pages/Index/Search/search-page/search-page.component';
import { ThreadPageComponent } from './Pages/Index/Thread/threadPage.component';
import { AboutPageComponent } from './Pages/Index/about/about-page.component';
import { IndexComponent } from './Pages/Index/index.component';
import { SettingPageComponent } from './Pages/Index/setting/setting-page.component';
import { NotfoundPageComponent } from './Pages/util/notfound-page/notfound-page.component';
import { AuthGuard } from './Utils/AuthGuard';

export const routes: Routes = [

  { path: "login", component: LoginPageComponent, pathMatch: "full", title: "Threads | Login" },
  { path: "signup", component: SignUpPageComponent, pathMatch: "full", title: "Threads | Signup" },


  {
    path: "",
    component: IndexComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: HomePageComponent, pathMatch: "full", title: "Threads | Feed" },
      { path: "search", component: SearchPageComponent, pathMatch: "full", title: "Threads | Search" },
      { path: "activity", component: ActivityComponent, pathMatch: "full", title: "Threads | Activity" },
      { path: "setting", component: SettingPageComponent, pathMatch: "full", title: "Threads | Settings" },
      { path: "about", component: AboutPageComponent, pathMatch: "full", title: "Threads | About me" },
      { path: "user/" + ":id", component: ProfilePageComponent, title: "Threads | Profile", pathMatch: "full" },
      { path: "thread/" + ":id", component: ThreadPageComponent, title: "Threads ", pathMatch: "full" },

    ]
  },
  {
    path: "admin",
    redirectTo: "admin/dashboard",
    pathMatch: "full"
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: AdminHomeComponent, pathMatch: "full", title: "Admin | Dashboard" },
      { path: "subscriptions", component: AdminSubscriptionsComponent, pathMatch: "full", title: "Admin | Income" },
      { path: "reports", component: UserReportsComponent, pathMatch: "full", title: "Admin | Reports" },
      { path: "reports/config", component: ReportsConfigComponent, pathMatch: "full", title: "Admin | Reports config" },
      { path: "bug-reports", component: BugReportsComponent, pathMatch: "full", title: "Admin | Bug reports" },
      { path: "constants", component: ConstantsComponent, pathMatch: "full", title: "Admin | environment" },
      { path: "packages", component: PackagesComponent, pathMatch: "full", title: "Admin | Packages" },
      { path: "users", component: UsersComponent, pathMatch: "full", title: "Admin | Users" },
      { path: "settings", component: SettingComponent, pathMatch: "full", title: "Admin | Settings" },
    ]
  },

  { path: "**", component: NotfoundPageComponent, title: "404 | Not Found" }
];
