import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() myUser!: User;
  constructor(private usersServices: UsersService) { }
  async deleteUser(pId: string | undefined): Promise<any> {
    if (pId !== undefined) {
      try {
        let response = await this.usersServices.delete(pId);
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
