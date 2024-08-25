import { UserInterface, UserDetails } from "./Interfaces";

export class User {
    user_id : number;
    email : string;
    password : string;
    userDetails? : UserDetails;

    constructor(user : UserInterface) {
        this.user_id = user.user_id;
        this.email = user.email;
        this.password = user.password;
    }
}