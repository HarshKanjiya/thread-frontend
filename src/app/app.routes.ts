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
      { path: "dashboard", component: AdminHomeComponent, pathMatch: "full" },
      { path: "subscriptions", component: AdminSubscriptionsComponent, pathMatch: "full" },
      { path: "reports", component: AdminReportsComponent, pathMatch: "full" },
    ]
  },

  { path: "login", component: LoginPageComponent, pathMatch: "full" },
  { path: "signup", component: SignUpPageComponent, pathMatch: "full" },

  {
    path: "",
    component: IndexComponent,
    children: [
      { path: "feed", component: HomePageComponent, pathMatch: "full" },
      { path: "search", component: SearchPageComponent, pathMatch: "full" },
      { path: "activity", component: ActivityComponent, pathMatch: "full" },
      { path: ":id", component: ProfilePageComponent },
    ]
  },

];
