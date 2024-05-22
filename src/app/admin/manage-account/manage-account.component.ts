import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Account } from 'src/app/models/account';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
  accountForm!: FormGroup;
  accounts: Account[] = [];
  isVisible = false;
  isAddModelVisible = false;
  searchForm!: FormGroup;
  searchTitle: string = '';
  currentImageUrl: string | undefined;

  editedAccount: Account = { accountId:0,username:'',password:'',email:'',fullname:'',gender:false,balance:0,membership:false,path:'',role:'',createdDate:new Date()};
  addedAccount: Account = { accountId:0,username:'',password:'',email:'',fullname:'',gender:false,balance:0,membership:false,path:'',role:'',createdDate:new Date()};
  constructor(private authService:AuthServiceService,private modalService: NzModalService, private message: NzMessageService){

  }

  ngOnInit(): void {
    this.getAccount();
  }  
  getAccount(): void {
    this.authService.getAccountList().subscribe(accounts => this.accounts = accounts);
  }

  handleOk(): void {
    console.log('Form submitted!');
    this.getAccount();
    this.isVisible = false;
  }

  editAccount(): void {
    this.authService.editAccount(this.editedAccount).subscribe(
      () => {
        this.message.success('Account updated successfully');
        this.getAccount();
      },
      (error) => {
        console.log(error)
        this.message.error(error.error);
      }
    );
    this.getAccount();
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Form cancelled!');
    this.isVisible = false;
  }

  confirmDelete(account: Account): void {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xoá?',
      nzContent: `Tài khoản <b>${account.accountId}</b> sẽ bị xoá.`,
      nzOkText: 'Xoá',
      nzOnOk: () => this.deleteAccount(account),
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  
  addAccount(): void {
    this.authService.signUp(this.addedAccount).subscribe(
      () => {
        this.message.success('Account added successfully');
        this.getAccount();
      },
      (error) => {
        console.log(error)
        this.message.error(error.error);
      }
    );
    this.getAccount();
    this.isAddModelVisible = false;
  }

  handleAddModalCancel(): void {
    console.log('Form cancelled!');
    this.isAddModelVisible = false;
  }

  deleteAccount(account: Account): void {
    this.authService.deleteAccount(account.accountId).subscribe({
      next: () => {
        this.getAccount();
        this.message.success('Xoá tài khoản thành công');
      },
      error: (err) => {
        console.error('Lỗi khi xoá tài khoản:', err);
        this.message.error('Đã có lỗi xảy ra khi xoá tài khoản!');
      }
    });
  }

  showEditModal(account: Account): void {
    this.isVisible=true;
    this.editedAccount = { ...account};
  }

  showAddModal(): void {
    this.isAddModelVisible=true;
  }

  onImageEdit(event: any): void {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.currentImageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
filterCategories() {
  if (!this.searchTitle.trim()) {
    this.getAccount();
  } else {
    this.accounts = this.accounts.filter(account =>
      account.fullname.toLowerCase().includes(this.searchTitle.toLowerCase())
    );
  }
}
onsearchTermChange() {
  this.filterCategories();
}

}
