export interface SignInData {
  loginame: string;
  password: string;
}
export interface SignInResponse {
  isError: boolean;
  message: string;
  token: string;
  expireIn: number;
}
// export class SignInData {
//   idToken(loginame: string, password: string, idToken: any, arg3: number) {
//     throw new Error('Method not implemented.');
//   }
//   private loginame: string;
//   private password: string;
//   expiresIn: any;

//   constructor(loginame: string, password: string) {
//     this.loginame = loginame;
//     this.password = password;
//   }

//   getLoginame(): string {
//     return this.loginame;
//   }

//   getPassword(): string {
//     return this.password;
//   }
// }
