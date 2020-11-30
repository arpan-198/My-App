import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserServices } from 'src/app/Services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  tableData: any[];
  keys: any;

  constructor(private user: UserServices, private cookieservice: CookieService, private route: Router) {

    user.httpGetUploadedData().subscribe(
      (next) => {
        this.tableData = next.data;
      },
      (err) => {
        if (err) throw err;
      },
      () => {
        this.keys = Object.keys(this.tableData['csvfile'][0]);

      }
    )

  }

  ngOnInit(): void {


  }


  logout() {
    this.user.httpDeleteLogout().subscribe(
      (next) => {
        this.cookieservice.deleteAll('/', 'localhost');
        alert(next.message);
        this.route.navigate(['login']);
      },
      (err) => {
        console.log(err);

      }
    )
  }

}
