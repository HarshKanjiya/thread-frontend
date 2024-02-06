import { Routes } from '@angular/router';
import { AdminHomeComponent } from './Pages/Admin/admin-home/admin-home.component';
import { AdminReportsComponent } from './Pages/Admin/admin-reports/admin-reports.component';
import { AdminSubscriptionsComponent } from './Pages/Admin/admin-subscriptions/admin-subscriptions.component';
import { AdminComponent } from './Pages/Admin/admin.component';
import { LoginPageComponent } from './Pages/Auth/login-page/login-page.component';
import { SignUpPageComponent } from './Pages/Auth/sign-up-page/sign-up-page.component';
import { ActivityComponent } from './Pages/Index/Activity/activity/activity.component';
import { HomePageComponent } from './Pages/Index/Home/home-page/home-page.component';
import { ProfilePageComponent } from './Pages/Index/Profile/profile-page.component';
import { SearchPageComponent } from './Pages/Index/Search/search-page/search-page.component';
import { AboutPageComponent } from './Pages/Index/about/about-page.component';
import { IndexComponent } from './Pages/Index/index.component';
import { SettingPageComponent } from './Pages/Index/setting/setting-page.component';
import { NotfoundPageComponent } from './Pages/util/notfound-page/notfound-page.component';
import { AuthGuard } from './Utils/AuthGuard';

export const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: AdminHomeComponent, pathMatch: "full", title: "Admin | Dashboard" },
      { path: "subscriptions", component: AdminSubscriptionsComponent, pathMatch: "full", title: "Admin | Income" },
      { path: "reports", component: AdminReportsComponent, pathMatch: "full", title: "Admin | Reports" },
    ]
  },

  { path: "login", component: LoginPageComponent, pathMatch: "full", title: "Threads | Login" },
  { path: "signup", component: SignUpPageComponent, pathMatch: "full", title: "Threads | Signup" },


  {
    path: "",
    component: IndexComponent,
    canActivate:[AuthGuard],
    children: [
      { path: "", component: HomePageComponent, pathMatch: "full", title: "Threads | Feed" },
      { path: "search", component: SearchPageComponent, pathMatch: "full", title: "Threads | Search" },
      { path: "activity", component: ActivityComponent, pathMatch: "full", title: "Threads | Activity" },
      { path: "setting", component: SettingPageComponent, pathMatch: "full", title: "Threads | Settings" },
      { path: "about", component: AboutPageComponent, pathMatch: "full", title: "Threads | About me" },
      { path: "user/" + ":id", component: ProfilePageComponent, title: "Threads | Profile", pathMatch: "full" },
    ]
  },

  { path: "**", component: NotfoundPageComponent, title: "404 | Not Found" }
];
