import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Account } from 'src/app/models/account';
import { Membership } from 'src/app/models/membership';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MembershipServiceService } from 'src/app/services/membership-service.service';

@Component({
  selector: 'app-membership-page',
  templateUrl: './membership-page.component.html',
  styleUrls: ['./membership-page.component.scss']
})
export class MembershipPageComponent implements OnInit{
  memberships: Membership[] = [];
  size: NzButtonSize = 'default';
  currentUser: Account | null = null;
constructor( private membershipService: MembershipServiceService, private auth: AuthServiceService,private notification: NzNotificationService) {

}
ngOnInit(): void {
  this.loggedinUser();
  this.getMemberships();
}
  getMemberships() {
    this.membershipService.getMemberships().subscribe(data => {
      this.memberships = data;
    });
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

registerMembership(membershipId: number): void {
  debugger
  if (this.currentUser) {
    this.auth.registerMembership(this.currentUser.accountId, membershipId).subscribe(
      () => {
        this.notification.success('', 'Đăng ký hội viên thành công');
      },
      (error) => {
        this.notification.error('', 'Đăng ký hội viên không thành công');
        console.error(error);
      }
    );
  } else {
    console.error('Không thể đăng ký gói hội viên vì không tìm thấy người dùng đăng nhập');
  }
}
}
