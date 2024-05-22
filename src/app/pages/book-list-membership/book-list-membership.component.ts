import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookServiceService } from 'src/app/services/book-service.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-book-list-membership',
  templateUrl: './book-list-membership.component.html',
  styleUrls: ['./book-list-membership.component.scss']
})
export class BookListMembershipComponent implements OnInit {
  membershipBooks:Book[] = [];
  categories: Category[] = [];
  searchTitle: string = '';
  constructor(private bookService: BookServiceService, private categoryService: CategoryServiceService, private router: Router) { }
  
  ngOnInit(): void {
    this.getBooksforMembership()
    this.getCategories();
  }
  getBooksforMembership(): void {
    this.bookService.getBooksforMembership().subscribe(
      data => {
        this.membershipBooks = data;
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
  
  filterBooks() {
    if (!this.searchTitle.trim()) {
      this.getBooksforMembership();
    } else {
      this.membershipBooks = this.membershipBooks.filter(book =>
        book.title.toLowerCase().includes(this.searchTitle.toLowerCase())
      );
    }
  }
  onsearchTermChange() {
    this.filterBooks();
  }
}
