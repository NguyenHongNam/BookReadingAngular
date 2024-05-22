import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Account } from 'src/app/models/account';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newAccount: Account={accountId:0,username:'',password:'',fullname:'',email:'',gender:false,role:'User',createdDate:new Date(), balance:0, membership:false, path: 'null'};
  constructor(private authService: AuthServiceService, private router: Router,private notification: NzNotificationService) { }

  ngOnInit(): void {

  }
  register(): void {
    debugger
    this.authService.signUp(this.newAccount).subscribe(response => {
      this.notification.success('', 'Tạo tài khoản thành công');
      this.router.navigate(['/login']);
    }, error => {
      console.error(error);
      
    });
  }
}
