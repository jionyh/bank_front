export interface UserType{
  email: string
  password: string
}
export interface AuthUser {
  accessToken: string
}

export interface AuthResponse {
  accessToken: string
}

export interface SignUpResponse{
  email:string
  id:number
}