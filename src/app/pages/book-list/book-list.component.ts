import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookServiceService } from 'src/app/services/book-service.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
freeBooks:Book[] = [];
categories: Category[] = [];
searchKeyword: string = '';
constructor(private bookService: BookServiceService, private categoryService: CategoryServiceService, private router: Router) { }

ngOnInit(): void {
  this.getFreeBooks()
  this.getCategories();
}
getFreeBooks(): void {
  this.bookService.getFreeBooks().subscribe(
    data => {
      this.freeBooks = data;
    },
    (error) => {
      console.error('Error fetching free books:', error);
    }
  );
}

getCategories(): void {
  this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);
}

gotoBookDetail(bookId: number): void{
  this.router.navigate(['/book-detail', bookId]);
}
searchBooks(): void {
  debugger
  if (!this.searchKeyword.trim()) {
    // Nếu từ khóa tìm kiếm trống, hiển thị lại danh sách ban đầu
    this.getFreeBooks();
  } else {
    // Nếu có từ khóa tìm kiếm, lọc danh sách sách theo từ khóa
    this.freeBooks = this.freeBooks.filter(book =>
      book.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
}
