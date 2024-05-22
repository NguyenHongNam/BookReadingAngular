import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { da_DK } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { AuthorServiceService } from 'src/app/services/author-service.service';
import { BookServiceService } from 'src/app/services/book-service.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss']
})
export class ManageBooksComponent implements OnInit {
  books: Book[] =[];
  bookForm!: FormGroup;
  isVisible = false;
  isAddModelVisible = false;
  currentImageUrl: string | undefined;
  searchTitle: string = '';
  editedBook: Book = { bookId:0, title:'',description:'',publisher:'',content:'',imgsrc:'',views:0,releaseDate:new Date(),forMembership:false,price:0,categoryId:0,authorId:0};
  addedBook: Book= { bookId:0, title:'',description:'',publisher:'',content:'',imgsrc:'',views:0,releaseDate:new Date(),forMembership:false,price:0,categoryId:0,authorId:0};
  previewImageUrl: string | ArrayBuffer | null = null;
  categoryList: Category[] = [];
  authorList: Author[] = [];

  constructor(
    private bookService: BookServiceService,
    private modalService: NzModalService, 
    private message: NzMessageService,
    private fb: FormBuilder,
    private categoryService: CategoryServiceService,
    private authorService: AuthorServiceService
  ) { }

  ngOnInit(): void {
    this.getBooks();
    this.categoryService.getCategories().subscribe(data => { this.categoryList = data });
    this.authorService.getAuthors().subscribe(data => { this.authorList = data });
  }

  getBooks(): void {
    this.bookService.getAllBooks().subscribe(books => this.books = books);
  }

  handleOk(): void {
    console.log('Form submitted!');
    this.getBooks();
    this.isVisible = false;
  }

  editBooks(): void {
    this.bookService.updateBook(this.editedBook).subscribe(
      () => {
        this.message.success('Cập nhật sách thành công');
        this.getBooks();
      },
      (error) => {
        console.log(error)
        this.message.error(error.error);
      }
    );
    this.getBooks();
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Form cancelled!');
    this.isVisible = false;
  }

  confirmDelete(book: Book): void {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xoá?',
      nzContent: `Sách <b>${book.title}</b> sẽ bị xoá.`,
      nzOkText: 'Xoá',
      nzOnOk: () => this.deleteBook(book),
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  
  addBook(): void {
    this.bookService.createBook(this.addedBook).subscribe(
      () => {
        this.message.success('Thêm sách thành công');
        this.getBooks();
      },
      (error) => {
        console.log(error)
        this.message.error(error.error);
      }
    );
    this.getBooks();
    this.isAddModelVisible = false;
  }

  handleAddModalCancel(): void {
    console.log('Form cancelled!');
    this.isAddModelVisible = false;
  }

  deleteBook(book: Book): void {
    this.bookService.deleteBook(book.bookId).subscribe({
      next: () => {
        this.getBooks();
        this.message.success('Xoá sách thành công');
      },
      error: (err) => {
        console.error('Lỗi khi xoá sách:', err);
        this.message.error('Đã có lỗi xảy ra khi xoá sách!');
      }
    });
  }

  showEditModal(book: Book): void {
    this.isVisible=true;
    this.editedBook = { ...book};
    this.currentImageUrl = this.editedBook.imgsrc;
  }

  showAddModal(): void {
    this.isAddModelVisible=true;
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewImageUrl = reader.result;
        this.addedBook.imgsrc = reader.result as string;
      };
    }
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
    this.getBooks();
  } else {
    this.books = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTitle.toLowerCase())
    );
  }
}
onsearchTermChange() {
  this.filterCategories();
}
}
