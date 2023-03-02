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
  constructor(private usersService: UsersService) {

  }
  async ngOnInit(): Promise<any> {
    try {
      let response = await this.usersService.getAll();
      this.arrUsers = response.results;
    }
    catch (err) {
      console.log(err);
    }
  }
}
