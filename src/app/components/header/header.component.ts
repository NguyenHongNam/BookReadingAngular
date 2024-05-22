import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Account } from 'src/app/models/account';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser: Account | null = null;
  size: NzButtonSize = 'default';
  isLoggedIn = false;

  constructor(private authService: AuthServiceService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
    this.loggedinUser();
  }
  getCurrentUser(): void{
    this.authService.getUserFromToken();
  }
  logout(): void {
    this.authService.clearAuthToken();
    this.router.navigateByUrl('/login');
  }
  gotoUserInfo(accountId: number): void{
    this.router.navigate(['/user-page', accountId]);
  }
  loggedinUser(): void{
    const accountId = localStorage.getItem('foundAccount');
    if (accountId) {
    this.authService.getUserById(parseInt(accountId, 10)).subscribe(
    (account: Account) => {
      this.currentUser = account;
    },
    (error) => {
      console.error(error);
    }
  );
}
}

navigateToMembershipPage(): void {
  if (this.currentUser?.membership === true) {
    this.router.navigateByUrl('/book-list-membership');
  } else {
    alert('Bạn chưa phải là hội viên!');
  }
}

}
