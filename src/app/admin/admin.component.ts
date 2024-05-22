import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isCollapsed = false;
  currentTime!: Date;

  ngOnInit() {
    this.setCurrentTime();
  }
  setCurrentTime() {
    this.currentTime = new Date();
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000); // Cập nhật thời gian mỗi giây
  }
}
