import {Injectable} from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  successPopup(title: string) {
    const Toast = Swal.mixin({
      title: title,
      toast: true,
      position: 'center',
      showConfirmButton: false,
      icon: "success",
      iconColor: "#0072bc",
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    Toast.fire({
      icon: 'success',
      title: "Success",
      text: title
    })
  }

  errorPopup(title: string) {
    Swal.fire({
      title: 'Oops...',
      text: title,
      icon: "error",
      showConfirmButton: true,
      confirmButtonText: "OK",
      confirmButtonColor: "#0072bc"
    });
  }

  constructor() {
  }
}
