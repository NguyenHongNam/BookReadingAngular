import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-reading-page',
  templateUrl: './reading-page.component.html',
  styleUrls: ['./reading-page.component.scss']
})
export class ReadingPageComponent implements OnInit {
  book: Book | null = null;
  error: string | null = null;
  constructor(private route: ActivatedRoute, private bookService: BookServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = parseInt(params.get('bookId')!, 10); // Handle potential errors
      this.fetchBookDetails(bookId);
    });
  }

  fetchBookDetails(bookId: number): void {
    this.bookService.getBookById(bookId)
      .subscribe({
        next: (book) => this.book = book,
        error: (err) => this.error = err.message || 'An error occurred'
      });
  }
}
