import { Component, OnInit } from '@angular/core';
import { Membership } from 'src/app/models/membership';
import { MembershipServiceService } from 'src/app/services/membership-service.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-membership',
  templateUrl: './manage-membership.component.html',
  styleUrls: ['./manage-membership.component.scss']
})
export class ManageMembershipComponent implements OnInit {
  membershipForm: FormGroup;
  memberships: Membership[] = [];
  pageIndex = 0;
  pageSize = 5;
  isVisible = false;
  isAddModelVisible = false;
  listOfCurrentPageData: readonly Membership[] = [];
  searchForm: FormGroup;
  currentSearchKeyword: string = '';

  editedMembership: Membership = { membershipId:0, membershipName:'',price:0};
  addedMembership: Membership= { membershipId:0, membershipName:'',price:0};
  constructor(private fb: FormBuilder,private membershipService: MembershipServiceService,private modalService: NzModalService, private message: NzMessageService) {
    
    this.membershipForm = this.fb.group({
      membershipName: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.searchForm = this.fb.group({
      membershipName: ['']
    });
   }
  ngOnInit(): void {
    this.initForm();
    this.getMemberships();
  }
  getMemberships() {
    this.membershipService.getMemberships().subscribe(data => {
      this.memberships = data;
    });
  }
  handleOk(): void {
    console.log('Form submitted!');
    this.getMemberships();
    this.isVisible = false;
  }

  editMembership(): void {
    this.membershipService.updateMembership(this.editedMembership).subscribe(
      () => {
        this.message.success('Cập nhật gói hội viên thành công');
        this.getMemberships();
      },
      (error) => {
        console.log(error)
        this.message.error(error.error);
      }
    );
    this.getMemberships();
    this.isVisible = false;
  }
  
  handleCancel(): void {
    console.log('Form cancelled!');
    this.isVisible = false;
  }
  confirmDelete(membership: Membership): void {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xoá?',
      nzContent: `Gói <b>${membership.membershipName}</b> sẽ bị xoá.`,
      nzOkText: 'Xoá',
      nzOnOk: () => this.deleteMembership(membership),
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  addMembership(): void {
    this.membershipService.addMembership(this.addedMembership).subscribe(
      () => {
        this.message.success('Thêm gói hội viên thành công');
        this.getMemberships();
      },
      (error) => {
        console.log(error)
        this.message.error(error.error);
      }
    );
    this.getMemberships();
    this.isAddModelVisible = false;
  }

  handleAddModalCancel(): void {
    console.log('Form cancelled!');
    this.isAddModelVisible = false;
  }
  deleteMembership(membership: Membership): void {
    this.membershipService.deleteMembership(membership.membershipId).subscribe({
      next: () => {
        this.getMemberships(); // Lấy danh sách lại sau khi xóa
        this.message.success('Xoá gói hội viên thành công!');
      },
      error: (err) => {
        console.error('Lỗi khi xoá gói hội viên:', err);
        this.message.error('Đã có lỗi xảy ra khi xoá gói hội viên!');
      }
    });
  }
  showEditModal(membership: Membership): void {
    this.isVisible=true;
    this.editedMembership = { ...membership };
  }

  showAddModal(): void {
    this.isAddModelVisible=true;
  }

  onPageIndexChange(event: number) {
    this.pageIndex = event;
    this.getMemberships();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      membershipName: [''] // Khởi tạo control cho tên gói hội viên
    });
  }

  searchMemberships(): void {
    this.currentSearchKeyword = this.searchForm.get('membershipName')!.value;
    if (!this.currentSearchKeyword) {
      this.getMemberships(); // Nếu không nhập từ khoá, tải lại danh sách đầy đủ
      return;
    }
    this.membershipService.searchMemberships(this.currentSearchKeyword).subscribe(data => {
      this.memberships = data;
      if (data.length === 0) {
        this.message.info('Không tìm thấy kết quả phù hợp.');
      }
    });
  }

  deleteSearchKeyword(): void {
    this.searchForm.get('membershipName')!.setValue('');
    this.getMemberships();
  }
}
