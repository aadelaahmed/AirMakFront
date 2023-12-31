import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SuccessPopupService {

  constructor() { }

  showSuccessPopupMenu(message:string){
    /*Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your property will be reviewed before publishing.',
      showConfirmButton: false,
      timer: 3500
    })*/
    Swal.fire(
      'Good job!',
      message,
      'success'
    )
  }
}
