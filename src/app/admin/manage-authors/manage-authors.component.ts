import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Author } from 'src/app/models/author';
import { AuthorServiceService } from 'src/app/services/author-service.service';

@Component({
  selector: 'app-manage-authors',
  templateUrl: './manage-authors.component.html',
  styleUrls: ['./manage-authors.component.scss']
})
export class ManageAuthorsComponent {
  authorForm: FormGroup;
  authors: Author[] = [];
  pageIndex = 0;
  pageSize = 5;
  isVisible = false;
  isAddModelVisible = false;
  listOfCurrentPageData: readonly Author[] = [];
  searchForm: FormGroup;
  currentSearchKeyword: string = '';

  editedAuthor: Author = { authorId:0, authorName:'',royalties:0};
  addedAuthor: Author= { authorId:0, authorName:'',royalties:0};
  royalties: number|undefined;
  constructor(private fb: FormBuilder,private authorService: AuthorServiceService,private modalService: NzModalService, private message: NzMessageService) {
    
    this.authorForm = this.fb.group({
      authorName: ['', Validators.required]
    });

    this.searchForm = this.fb.group({
      authorName: ['']
    });
   }
  ngOnInit(): void {
    this.getAuthors();
  }
  getAuthors() {
    this.authorService.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }
  handleOk(): void {
    console.log('Form submitted!');
    this.getAuthors();
    this.isVisible = false;
  }

  editAuthors(): void {
    this.authorService.updateAuthor(this.editedAuthor).subscribe(
      () => {
        this.message.success('Cập nhật tác giả thành công');
        this.getAuthors();
      },
      (error) => {
        console.log(error)
        this.message.error(error.error);
      }
    );
    this.getAuthors();
    this.isVisible = false;
  }
  
  handleCancel(): void {
    console.log('Form cancelled!');
    this.isVisible = false;
  }
  confirmDelete(author: Author): void {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xoá?',
      nzContent: `Tác giả <b>${author.authorName}</b> sẽ bị xoá.`,
      nzOkText: 'Xoá',
      nzOnOk: () => this.deleteAuthor(author),
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  addAuthor(): void {
    this.authorService.addAuthor(this.addedAuthor).subscribe(
      () => {
        this.message.success('Thêm tác giả thành công');
        this.getAuthors();
      },
      (error) => {
        console.log(error)
        this.message.error(error.error);
      }
    );
    this.getAuthors();
    this.isAddModelVisible = false;
  }

  handleAddModalCancel(): void {
    console.log('Form cancelled!');
    this.isAddModelVisible = false;
  }
  deleteAuthor(author: Author): void {
    this.authorService.deleteAuthor(author.authorId).subscribe({
      next: () => {
        this.getAuthors();
        this.message.success('Xoá tác giả thành công');
      },
      error: (err) => {
        console.error('Lỗi khi xoá tác giả:', err);
        this.message.error('Đã có lỗi xảy ra khi xoá tác giả!');
      }
    });
  }
  showEditModal(author: Author): void {
    this.isVisible=true;
    this.editedAuthor = { ...author };
  }

  showAddModal(): void {
    this.isAddModelVisible=true;
  }

  getRoyalties(author: any): void {
    this.authorService.getAuthorRoyalties(author.authorId).subscribe(royalties => {
      this.royalties = royalties;
    });
  }
}
