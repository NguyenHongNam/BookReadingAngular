import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminComponent } from './admin/admin.component';
import { ManageBooksComponent } from './admin/manage-books/manage-books.component';
import { ManageAccountComponent } from './admin/manage-account/manage-account.component';
import { ManageAuthorsComponent } from './admin/manage-authors/manage-authors.component';
import { ManageCategoriesComponent } from './admin/manage-categories/manage-categories.component';
import { ManageMembershipComponent } from './admin/manage-membership/manage-membership.component';
import { ManageStatisticsComponent } from './admin/manage-statistics/manage-statistics.component';
import { LoginComponent } from './pages/login/login.component';
import { ReadingPageComponent } from './pages/reading-page/reading-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { MembershipPageComponent } from './pages/membership-page/membership-page.component';
import { BookListMembershipComponent } from './pages/book-list-membership/book-list-membership.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    component: HomePageComponent
  },
  {path:'book-detail', component:BookDetailComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path: 'book-detail/:bookId', component: BookDetailComponent },
  {path: 'reading-page/:bookId', component: ReadingPageComponent },
  {path: 'book-list', component: BookListComponent },
  {path: 'book-list-membership', component: BookListMembershipComponent },
  {path: 'user-page/:accountId', component: UserPageComponent },
  {path: 'membership-page', component: MembershipPageComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    children: [
      { path: 'manage-books', component: ManageBooksComponent },
      { path: 'manage-account', component: ManageAccountComponent },
      { path: 'manage-authors', component: ManageAuthorsComponent },
      { path: 'manage-categories', component: ManageCategoriesComponent },
      { path: 'manage-membership', component: ManageMembershipComponent },
      { path: 'manage-statistics', component: ManageStatisticsComponent },
      { path: 'manage-account', component: ManageAccountComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
