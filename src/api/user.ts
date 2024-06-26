import { baseURL, fetchOptions } from "@/config/api";
import { AuthResponse, SignUpResponse, UserType } from "@/types/authType";
import { ErrorResponse } from "@/types/error";

export const login = async (data:UserType):Promise<AuthResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/login`, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });

  const json =  await res.json();
  return json
};

export const signup = async (data:UserType):Promise<SignUpResponse | ErrorResponse> => {
  "use server";
  
  const options = await fetchOptions()
  const res = await fetch(`${baseURL}/user/signup`, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });

  const json =  await res.json();
  return json
};


export const me = async():Promise<any> =>{
  "use server";  
  const options = await fetchOptions()
  console.log(options)
  const res = await fetch(`${baseURL}/user/me`, {
    ...options,
  });
  const json =  await res.json();
  console.log(json)
  return json
}

