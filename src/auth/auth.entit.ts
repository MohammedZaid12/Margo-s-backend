import { IsDate, IsEmail, Length, Matches, Max, Min } from "class-validator";

export class Auth {
   
    @IsEmail()
    email:string;
    password:string;

}
