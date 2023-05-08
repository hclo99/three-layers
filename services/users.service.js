const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/users.repository")

class UserService {
    userRepository = new UserRepository(); // user레포 class 소환

    existsUsers1 = async ( email ) => {
        const existsUsers = await this.userRepository.existsUsers2( email );
        return existsUsers;
    };

    signup1 = async ( email, nickname, password ) => { // controller에서 받아오는 속성들
        const signup = await this.userRepository.signup2( email, nickname, password ); // repository 내보낼 속성들
        return signup;
    };

    login1 = async ( email ) => {
        const login = await this.userRepository.login2 ( email );
        return login; 
    };

    tokenmake1 = async ( login ) => {
        const token = jwt.sign({ userId: login.userId }, "clo_key");
        return token;
    }
};

module.exports = UserService;