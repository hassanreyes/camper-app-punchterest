import axios                from "axios";

//Authorization service class
class Auth {
    
    logIn(){
        return axios.get('/auth/login');
    }
}

export default new Auth();