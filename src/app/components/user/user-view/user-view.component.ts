import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  currentUser!: User;
  constructor(
    private usersService: UsersService,
    private activateRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      let currentId: number = params.userid;
      let response: any = await this.usersService.getById(currentId);
      console.log(response);
      this.currentUser = response;
    })
  }
}