import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService, UserForm } from 'src/app/services/auth-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


constructor(private fb: NonNullableFormBuilder, private authService: AuthServiceService,private router: Router, private notification: NzNotificationService) {}

user: UserForm = {
  Username: '',
  Password: '',
};

login() {
  this.authService.signIn(this.user).subscribe(
    (authToken) => {
      this.notification.success('', 'Đăng nhập thành công');
      if (this.authService.hasRole("Admin"))
      this.router.navigate(['/admin/manage-statistics']);
      else this.router.navigate(['/home-page']);
    },
    (error) => {
      this.notification.error(error.error, 'Error');
    }
  );
}

  logout(): void {
    // Xóa token khỏi local storage
    localStorage.removeItem('accessToken');
    // Chuyển hướng đến trang đăng nhập
    this.router.navigateByUrl('/login');
  }
}
