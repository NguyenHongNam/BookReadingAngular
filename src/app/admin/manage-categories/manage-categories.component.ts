import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Category } from 'src/app/models/category';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {
  categoryForm: FormGroup;
  categories: Category[] = [];
  isVisible = false;
  isAddModelVisible = false;
  listOfCurrentPageData: readonly Category[] = [];
  searchTitle: string = '';

  editedCategory: Category = { categoryId:0, categoryName:''};
  addedCategory: Category= { categoryId:0, categoryName:''};
  constructor(private fb: FormBuilder,private categoryService: CategoryServiceService,private modalService: NzModalService, private message: NzMessageService) {
    
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });

   }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  handleOk(): void {
    console.log('Form submitted!');
    this.getCategories();
    this.isVisible = false;
  }

  editCategory(): void {
    this.categoryService.updateCategory(this.editedCategory).subscribe(
      () => {
        this.message.success('Cập nhật danh mục thành công');
        this.getCategories();
      },
      (error) => {
        console.log(error)
        this.message.error(error.error);
      }
    );
    this.getCategories();
    this.isVisible = false;
  }
  
  handleCancel(): void {
    console.log('Form cancelled!');
    this.isVisible = false;
  }
  confirmDelete(category: Category): void {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xoá?',
      nzContent: `Danh mục <b>${category.categoryName}</b> sẽ bị xoá.`,
      nzOkText: 'Xoá',
      nzOnOk: () => this.deleteCategory(category),
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  addCategory(): void {
    this.categoryService.addCategory(this.addedCategory).subscribe(
      () => {
        this.message.success('Thêm danh mục thành công');
        this.getCategories();
      },
      (error) => {
        console.log(error)
        this.message.error(error.error);
      }
    );
    this.getCategories();
    this.isAddModelVisible = false;
  }

  handleAddModalCancel(): void {
    console.log('Form cancelled!');
    this.isAddModelVisible = false;
  }
  deleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category.categoryId).subscribe({
      next: () => {
        this.getCategories(); // Lấy danh sách lại sau khi xóa
        this.message.success('Xoá danh mục thành công!');
      },
      error: (err) => {
        console.error('Lỗi khi xoá danh mục:', err);
        this.message.error('Đã có lỗi xảy ra khi xoá danh mục!');
      }
    });
  }
  showEditModal(category: Category): void {
    this.isVisible=true;
    this.editedCategory = { ...category };
  }

  showAddModal(): void {
    this.isAddModelVisible=true;
  }

  filterCategories() {
    if (!this.searchTitle.trim()) {
      this.getCategories();
    } else {
      this.categories = this.categories.filter(category =>
        category.categoryName.toLowerCase().includes(this.searchTitle.toLowerCase())
      );
    }
  }
  onsearchTermChange() {
    this.filterCategories();
  }

}
