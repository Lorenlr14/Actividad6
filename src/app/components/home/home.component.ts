import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arrUsers: User[] = [];
  totalPages: number = 0;
  arrPages: number[] = [];
  currentPage: number = 0;
  constructor(private usersService: UsersService) {

  }
  async ngOnInit(): Promise<any> {
    this.arrPages = [];
    this.gotoPage();
  }
  async gotoPage(pNum: number = 1): Promise<void> {
    try {
      let response = await this.usersService.getAll(pNum);
      this.currentPage = response.page;
      this.totalPages = response.total_pages;
      this.arrUsers = response.results;
      if (this.arrPages.length !== this.totalPages) {
        this.arrPages = [];
        for (let i = 1; i <= this.totalPages; i++) {
          this.arrPages.push(i);
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}
