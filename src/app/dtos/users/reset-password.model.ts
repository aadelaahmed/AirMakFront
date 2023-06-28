export class ResetPassword {
  private password: string;
  private confirmPassword: string;
  private token: string;

  constructor(password: string, confirmPassword: string, token: string) {
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.token = token;
  }
}
