import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { BookCategoryComponent } from './pages/book-category/book-category.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './pages/login/login.component';
import {NzFormModule} from "ng-zorro-antd/form";
import { ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ReadingPageComponent } from './pages/reading-page/reading-page.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { RegisterComponent } from './pages/register/register.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MembershipPageComponent } from './pages/membership-page/membership-page.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BookListMembershipComponent } from './pages/book-list-membership/book-list-membership.component';
registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    BookDetailComponent,
    FooterComponent,
    BookCategoryComponent,
    LoginComponent,
    ReadingPageComponent,
    RegisterComponent,
    BookListComponent,
    UserPageComponent,
    MembershipPageComponent,
    BookListMembershipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,
    NzButtonModule,
    NzDividerModule,
    NzAvatarModule,
    NzTableModule,
    AdminModule,
    NzFormModule,
    ReactiveFormsModule,
    NzNotificationModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzDropDownModule,
    NzModalModule,
    NzCardModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
