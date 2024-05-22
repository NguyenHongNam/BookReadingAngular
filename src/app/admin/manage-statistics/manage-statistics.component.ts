import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { Author } from 'src/app/models/author';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AuthorServiceService } from 'src/app/services/author-service.service';
Chart.register(...registerables);
@Component({
  selector: 'app-manage-statistics',
  templateUrl: './manage-statistics.component.html',
  styleUrls: ['./manage-statistics.component.scss']
})
export class ManageStatisticsComponent implements OnInit {
  chartdata:any []=[]
  topAuthors: Author[] = [];
  labeldata:any[]=[];
  realdata:any[]=[];
  colordata:any[]=[];
  constructor(private authorService: AuthorServiceService, private authService: AuthServiceService) {

  }
  ngOnInit(): void {
    this.authService.getMembershipStats().subscribe(data => {
      this.renderPieChart(data);
    });
    this.authorService.get4Author().subscribe(result => {
      this.chartdata = result;
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length ;i++){
          console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].authorName);
          this.realdata.push(this.chartdata[i].royalties);
          this.colordata.push(this.chartdata[i].colorcode);
        }
        this.RenderChart(this.labeldata,this.realdata,this.colordata);
      }
    });
  }

  RenderChart(labeldata:any,maindata:any,colordata:any) {
    const myChart = new Chart("chart1", {
      type: "bar",
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Nhuận bút',
          data: maindata,
          backgroundColor: colordata,
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

  renderPieChart(data: any): void {
    // const canvas: any = document.getElementById('pieChart');
    // const ctx = canvas.getContext('2d');

    Chart.register(...registerables);

    new Chart("chart2", {
      type: 'pie',
      data: {
        labels: ['Có đăng ký', 'Không đăng ký'],
        datasets: [{
          label: 'Số lượng tài khoản',
          data: [data.totalWithMembership, data.totalWithoutMembership],
          backgroundColor: ['#36a2eb', '#ffcd56'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false, // Set responsive to false
        maintainAspectRatio: false, // Disable maintaining aspect ratio
        aspectRatio: 1 // Set aspect ratio (width/height), for example: 1 for square
      }
    });
  }


  getTopFourAuthors(): void {
    this.authorService.get4Author()
      .subscribe(chartdata => this.topAuthors = chartdata);
  }

}
