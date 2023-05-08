const UserService = require("../services/users.service");

class UserController {
  userService = new UserService(); // 라우터에서 userservice 소환

  // 회원가입 method
  signup = async (req, res, next) => {
    const { email, nickname, password } = req.body; //confirm은 프론트 단계에서 작성하기

    try {
      // if (password !== confirm) {
      //   return res
      //     .status(412)
      //     .json({ errorMessage: "패스워드가 일치하지 않습니다." });
      // }

      // email 조건 써보기

      // nickname 중복
      const existsUsers = await this.userService.existsUsers1(nickname);
      if (existsUsers) {
        return res.status(412).json({ errorMessage: "중복된 닉네임입니다." });
      }

      // 닉네임 조건
      const nicknameFilter = /^[A-Za-z0-9]{3,}$/.test(nickname); // 정규식(regex) 유효성검사
      if (!nicknameFilter) {
        return res
          .status(412)
          .json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." });
      }

      // 패스워드 길이조건
      if (password.length < 4) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드 형식이 일치하지 않습니다." });
      }

      // 패스워드 형식조건
      if (password.includes(nickname)) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드에 닉네임이 포함되어 있습니다." });
      }

      // userservice의 signup1 호출, 그 반환값을 signup에 넣는다. 유효성 검사를 패스한 사항들을 택배 박스에 포장함
      const signup = await this.userService.signup1(email, nickname, password); // 성공시 데이터가 넘어가야하므로 안내문구가 나가기 전이 올바른 위치

      return res.status(201).json({ message: "회원 가입에 성공하였습니다." });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ errorMessage: "요청한 데이터 형식이 올바르지 않습니다." });
    }
  };

  // 로그인 method
  login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const login = await this.userService.login1(email);

      if (!login || password !== login.password) {
        // 로그인 정보가 없을때,,, login.email을 대체함
        return res
          .status(412)
          .json({ errorMessage: "이메일 또는 패스워드를 확인해주세요." });
      }

      // 로그인 시 토큰생성
      const tokenmake = await this.userService.tokenmake1(login);

      res.cookie("Authorization", `Bearer ${tokenmake}}`); // JWT를 Cookie로 할당
      res.status(200).json({ tokenmake }); // JWT를 Body로 할당
      return res.status(201).json({ message: "로그인에 성공하였습니다." });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
    }
  };
}

module.exports = UserController;
