import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  currentUser!: User;
  constructor(
    private usersService: UsersService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      let currentId: number = params.userid;
      let response: any = await this.usersService.getById(currentId);
      console.log(response);
      this.currentUser = response;
    })
  }
  async deleteUser(pId: string | undefined): Promise<any> {
    if (pId !== undefined) {
      try {
        let response = await this.usersService.delete(pId);
        if (response) {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })

          swalWithBootstrapButtons.fire({
            title: `¿Estás seguro de que quieres borrar al usuario ${response.first_name} ${response.last_name}?`,
            text: "¡No habrá vuelta atrás!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, quiero borrarlo',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                '¡Borrado!',
                `El usuario ${response.first_name} ${response.last_name} ha sido borrado correctamente`,
                'success'
              )
              this.router.navigate(['/home']);
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Se ha cancelado la operación, tu usuario sigue activo',
                'error'
              )
            }
          })
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }
}