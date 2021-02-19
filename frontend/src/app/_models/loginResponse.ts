export class loginResponse{
    login: string;
    token: string;

    public get getLogin(){
        return this.login;
    }
    public set setLogin(login: string){
        this.login = login
    }
    public get getToken(){
        return this.login;
    }
    public set setToken(token: string){
        this.token = token
    }


}