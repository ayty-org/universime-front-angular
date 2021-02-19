export class User {
    id: bigint;
    login: string;
    password: string;
    email: string;
    fullname: string;
    imagem:string
    profile: string

    constructor(login,password,email,fullname,profile){
        this.login = login;
        this.password = password;
        this.email = email;
        this.fullname = fullname;
        this.profile = profile
    }
}

