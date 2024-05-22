import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Account } from 'src/app/models/account';
import { Book } from 'src/app/models/book';
import { Rating } from 'src/app/models/rating';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BookServiceService } from 'src/app/services/book-service.service';
import { RatingServiceService } from 'src/app/services/rating-service.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  size: NzButtonSize = 'large';
  book: Book | null = null;
  error: string | null = null;
  curentUser: Account | null = null;
  rating: Rating[] =[];
  newComment: string = '';
  account:Account[]=[];
  constructor(private route: ActivatedRoute, 
    private bookService: BookServiceService, 
    private router: Router,
    private auth: AuthServiceService,
    private ratingService: RatingServiceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = parseInt(params.get('bookId')!, 10); // Handle potential errors
      this.fetchBookDetails(bookId);
    });
    this.loggedinUser();
    this.getComments();
  }
  fetchBookDetails(bookId: number): void {
    this.bookService.getBookById(bookId)
      .subscribe({
        next: (book) => this.book = book,
        error: (err) => this.error = err.message || 'An error occurred'
      });
  }
  loggedinUser(): void{
    const accountId = localStorage.getItem('foundAccount');
    if (accountId) {
    this.auth.getUserById(parseInt(accountId, 10)).subscribe(
    (account: Account) => {
      this.curentUser = account;
      console.log(account);
    },
    (error) => {
      console.error(error);
    }
  );
}
}

  gotoBookContent(bookId: number): void{
    this.router.navigate(['/reading-page', bookId]);
  }

  increaseViews(bookId: number): void {
    if (this.book) {
      this.book.views++; // Tăng lượt đọc của sách trong giao diện người dùng
      this.bookService.updateBook(this.book).subscribe({
        next: () => {
          console.log('Lượt đọc đã được cập nhật');
        },
        error: (err) => {
          console.error('Đã xảy ra lỗi khi cập nhật lượt đọc:', err);
        }
      });
    }
  }

  getComments(): void {
    if (this.book) {
      this.ratingService.getRatingsByBook(this.book.bookId).subscribe(
        (comments: any[]) => {
          this.rating = comments;
        },
        (error) => {
          console.error('Error comments:', error);
        }
      );
    }
  }

}
