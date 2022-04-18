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
