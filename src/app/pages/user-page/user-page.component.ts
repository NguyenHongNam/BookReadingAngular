import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Account } from 'src/app/models/account';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{
  size: NzButtonSize = 'small';
  currentUser: Account | null = null;
  depositAmount: number = 0;
  isVisible = false;
  errorMessage: string | null = null;
  form!: FormGroup;
  isAddModelVisible = false;
  depositForm!: FormGroup;
  newPassword: string = '';
  isChangePasswordModalVisible = false;
  changePasswordForm!: FormGroup;
  editedUser: Account ={ accountId:0,username:'',password:'',email:'',fullname:'',gender:false,balance:0,membership:false,path:'',role:'',createdDate:new Date()};
  constructor(private auth:AuthServiceService, private route: ActivatedRoute,private notification: NzNotificationService,private modalService: NzModalService,private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.loggedinUser();
    this.currentUser = this.auth.getUserFromToken();
    this.depositForm = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      series: new FormControl(null, Validators.required)
    });
    this.changePasswordForm = new FormGroup({
      curentPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required)
    });
  }

  editUser(): void {
    if (this.currentUser) {
      this.auth.updateUserInfo(this.currentUser)?.subscribe(
        (response) => {
          this.notification.success('', 'Nạp tiền thành công');
          console.log('Thông tin người dùng đã được cập nhật thành công');
        },
        (error) => {
          this.notification.error('', 'Đã xảy ra lỗi khi nạp tiền');
          console.error('Đã xảy ra lỗi khi nạp tiền:', error);
        }
      );
    }
  }
  loggedinUser(): void{
    const accountId = localStorage.getItem('foundAccount');
    if (accountId) {
    this.auth.getUserById(parseInt(accountId, 10)).subscribe(
    (account: Account) => {
      this.currentUser = account;
      console.log(account);
    },
    (error) => {
      console.error(error);
    }
  );
}
}
handleOk(): void {
  console.log('Form submitted!');
  this.auth.getUserFromToken()
  this.isVisible = false;
}

handleCancel(): void {
  console.log('Form cancelled!');
  this.isVisible = false;
}
showEditModal(account: Account): void {
  this.isVisible=true;
  this.editedUser = { ...account };
}

handleAddModalCancel(): void {
  console.log('Form cancelled!');
  this.isAddModelVisible = false;
}

showAddModal(): void {
  this.isAddModelVisible=true;
}

showChangePasswordModal(): void {
  this.isChangePasswordModalVisible = true;
}

handleCancelChangePassword(): void {
  this.isChangePasswordModalVisible = false;
}

deposit(): void {
  if (this.depositForm && this.depositForm.valid && this.currentUser) {
    const amount = this.depositForm.get('amount')?.value;
    const series = this.depositForm.get('series')?.value;
    this.auth.deposit(this.currentUser?.accountId || 0, amount, series)?.subscribe(
      (response) => {
        this.notification.success('','Nạp tiền thành công')
        console.log('Nạp tiền thành công');
        this.loggedinUser();
        this.isAddModelVisible = false;
      },
      (error) => {
        this.notification.error('','Nạp tiền thành không thành công')
        console.error('Đã xảy ra lỗi khi nạp tiền:', error);
        this.errorMessage = error;
      }
    );
  } else {
    // Hiển thị lỗi nếu form không hợp lệ
    this.errorMessage = 'Vui lòng nhập số tiền hợp lệ.';
  }
}

changePassword(): void {
  debugger
  if (this.changePasswordForm.valid && this.currentUser) {
    const curentPassword = this.changePasswordForm.get('curentPassword')?.value;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    this.auth.changePassword(this.currentUser?.accountId || 0, curentPassword, newPassword)?.subscribe(
      (response) => {
        this.notification.success('','Đổi mật khẩu thành công')
        console.log('Đổi mật khẩu thành công');
        this.loggedinUser();
        this.isChangePasswordModalVisible = false;
      },
      (error) => {
        this.notification.error('','Lỗi')
        console.error('Lỗi', error);
        this.errorMessage = error;
      }
    );
  } else {
    this.errorMessage = 'Lỗi';
  }
}

}
