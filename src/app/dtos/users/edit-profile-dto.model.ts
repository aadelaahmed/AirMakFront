export class EditProfileDto {
  public firstName: string;
  public lastName: string;
  public birthdate: Date;
  public phoneNumber: string;
  public email: string;

  constructor(firstName: string, lastName: string, birthdate: Date, phoneNumber: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}
