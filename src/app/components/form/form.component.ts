import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  userForm: FormGroup;
  user_image: string = "";
  user_name: string = "";
  form_register: boolean = true;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
        this.form_register = false;
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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `El usuario ${response.first_name} con id ${response._id} se ha actualizado correctamente`,
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
      catch (err) {
        console.log(err);
      }
    } else {
      try {
        let response = await this.usersService.create(user);
        if (response.id) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `El usuario ${response.first_name} con id ${response.id} se ha creado correctamente`,
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['/home'])
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }
}
