const dotenv = require('dotenv');
const utils = require('../utils/utils');
const jwt = require('jsonwebtoken');
const userService = require('../service/UserService');
dotenv.config();

//남용환
class UserController {
  static async join(req, res, next) {
    const { email, pwd, nickName } = req.body;

    const { salt, hashPwd } = utils.hashing(pwd);

    await userService
      .join(email, hashPwd, nickName, salt)
      .then(() => res.status(201).json({ message: `${nickName} 님 회원가입 완료` }))
      .catch(e => {
        next(e);
      });
  }

  static async login(req, res, next) {
    const { email, pwd } = req.body;

    await userService
      .login(email, pwd)
      .then(user => {
        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
          algorithm: 'HS256',
          expiresIn: 60 * 60 * 24, //토큰 유호기간 하루
        });
        const cookieOption = {
          httpOnly: true,
        };
        res.cookie('tk', token, cookieOption).sendStatus(200);
      })
      .catch(e => {
        console.log(e);
        next(e);
      });
  }

  static async resetPwd(req, res, next) {
    const { email, pwd } = req.body;

    try {
      await userService.getUser(email);
      await userService.changePwd(pwd, email);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
