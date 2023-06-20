import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  firstName: string;
  lastName: string;
  birthdate: Date;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private http: HttpClient,private router: Router) { }

  registerUser(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create the UserDTO object
    const requestRegistrationDTO = {
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: this.birthdate,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password
    };

    console.log('UserDTO:', requestRegistrationDTO);



    // Make the API call to register the user using the userDto object
    this.http.post('http://localhost:8080/users/register', requestRegistrationDTO).subscribe(
      (response: any) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error occurred while registering user', error);
        // Handle the error, display an error message, etc.
      }
    );
  }
}
