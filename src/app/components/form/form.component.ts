import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  userForm: FormGroup;
  user_image: string = "";
  user_name: string = "";

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ]),
      username: new FormControl("", [
        Validators.required
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\S+\@\S+\.[com,es]/)
      ]),
      image: new FormControl("", [
        Validators.required
      ])
    }, []);
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.userid;
      if (id) {
        const response = await this.usersService.getById(id);
        const user: User = response;
        this.user_image = user.image;
        this.user_name = user.first_name;
        this.userForm = new FormGroup({
          id: new FormControl(id, []),
          first_name: new FormControl(user?.first_name, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(150)
          ]),
          last_name: new FormControl(user?.last_name, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(150)
          ]),
          username: new FormControl(user?.username, [
            Validators.required
          ]),
          email: new FormControl(user?.email, [
            Validators.required,
            Validators.pattern(/^\S+\@\S+\.[com,es]/)
          ]),
          image: new FormControl(user?.image, [
            Validators.required
          ])
        }, []);
      }
    });
  }

  async getDataForm(): Promise<any> {
    let user: any = this.userForm.value;
    if (user.id) {
      try {
        let response = await this.usersService.update(user);
        if (response.id) {
          //this.msg = `El usuario ${response.first_name} con id ${response.id} se ha actualizado correctamente`;
          //this.type = "success";
          //this.router.navigate(['/home'])
        }
      }
      catch (err) {
        console.log(err);
      }
    } else {
      try {
        let response = await this.usersService.create(user);
        if (response.id) {
          //this.msg = `El usuario ${response.first_name} con id ${response.id} se ha creado correctamente`;
          //this.type = "success";
          //this.router.navigate(['/home'])
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }
}
