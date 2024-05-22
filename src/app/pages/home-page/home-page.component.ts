import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  freeBooks: any[] = [];
  newBooks: any[] = [];
  books: Book[] = []
  maxBooksToShow: number = 5
  maxFreeBooksToShow: number = 5;
constructor(private bookService: BookServiceService, private router:Router ){

}

ngOnInit(): void {
  this.getBooks();
  this.getFreeBooks();
  this.getNewBooks();
}
getBooks(): void {
  this.bookService.getAllBooks().subscribe(
    (books: any[]) => {
      this.books = books;
    },
    (error) => {
      console.error('Error fetching books:', error);
    }
  );
}
getFreeBooks(): void {
  this.bookService.getFreeBooks().subscribe(
    (books: any[]) => {
      this.freeBooks = books;
    },
    (error) => {
      console.error('Error fetching free books:', error);
    }
  );
}

getNewBooks(): void {
  this.bookService.getNewBooks().subscribe(
    (books: any[]) => {
      this.newBooks = books;
    },
    (error) => {
      console.error('Error fetching new books:', error);
    }
  );
}

gotoBookDetail(bookId: number): void{
  this.router.navigate(['/book-detail', bookId]);
}

}
