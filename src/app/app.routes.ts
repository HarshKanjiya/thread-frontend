import { Routes } from '@angular/router';
import { LoginPageComponent } from './Pages/Auth/login-page/login-page.component';
import { SignUpPageComponent } from './Pages/Auth/sign-up-page/sign-up-page.component';
import { SearchPageComponent } from './Pages/Index/Search/search-page/search-page.component';
import { ProfilePageComponent } from './Pages/Index/Profile/profile-page/profile-page.component';
import { ActivityComponent } from './Pages/Index/Activity/activity/activity.component';
import { HomePageComponent } from './Pages/Index/Home/home-page/home-page.component';
import { AdminReportsComponent } from './Pages/Admin/admin-reports/admin-reports.component';
import { AdminSubscriptionsComponent } from './Pages/Admin/admin-subscriptions/admin-subscriptions.component';
import { AdminHomeComponent } from './Pages/Admin/admin-home/admin-home.component';
import { AdminComponent } from './Pages/Admin/admin.component';
import { IndexComponent } from './Pages/Index/index.component';

export const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
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
    children: [
      { path: "", component: HomePageComponent, pathMatch: "full", title: "Threads | Feed" },
      { path: "search", component: SearchPageComponent, pathMatch: "full", title: "Threads | Search" },
      { path: "activity", component: ActivityComponent, pathMatch: "full", title: "Threads | Activity" },
      { path: ":id", component: ProfilePageComponent, title: "Threads | Profile" },
    ]
  }
];
