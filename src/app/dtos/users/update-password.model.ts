export class UpdatePassword {
  private oldPassword: string;
  private newPassword: string;
  private confirmPassword: string;

  constructor(password: string, confirmPassword: string, token: string) {
    this.oldPassword = password;
    this.newPassword = confirmPassword;
    this.confirmPassword = token;
  }
}
