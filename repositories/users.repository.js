const { Users } = require("../models"); // models의 users 소환


class UserRepository {
    // 서비스 받기, sequlize 작성 (키 속성 들어감 - db니까! model과 유사)
    existsUsers2 = async ( email ) => {
        const existsUsers = await Users.findOne({ where: { email } }); 
        return existsUsers;
    };

    signup2 = async ( email, nickname, password ) => { 
        const signup = await Users.create({ email, nickname, password }); // db에 저장
        return signup;
    };

    login2 = async ( email ) => {
        const login = await Users.findOne({ where: { email } });
        return login;
    };
};

module.exports = UserRepository;