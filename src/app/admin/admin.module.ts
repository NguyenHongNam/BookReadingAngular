import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ManageMembershipComponent } from './manage-membership/manage-membership.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageAuthorsComponent } from './manage-authors/manage-authors.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
@NgModule({
  declarations: [
    AdminComponent,
    ManageMembershipComponent,
    ManageCategoriesComponent,
    ManageAuthorsComponent,
    ManageBooksComponent,
    ManageAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzButtonModule,
    NzMessageModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzPaginationModule,
    NzPopoverModule
  ]
})
export class AdminModule { }