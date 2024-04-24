const { User } = require('../sequelize/models');
const utils = require('../utils/utils');

class UserService {
  #userModel;

  constructor() {
    this.#userModel = User;
  }

  async getUser(email) {
    const [user] = await this.#userModel.findAll({
      where: { email },
    });

    if (!user) throw new Error('Not found');

    return user;
  }

  async changePwd(changePwd, email) {
    const { hashPwd, salt } = utils.hashing(changePwd);
    await this.#userModel.update(
      {
        salt,
        pwd: hashPwd,
      },
      {
        where: { email },
      }
    );
  }

  async login(email, pwd) {
    const [user] = await this.#userModel.findAll({
      attributes: ['salt', 'pwd', 'id'],
      where: {
        email,
      },
    });
    if (!user) throw new Error('Not found');

    const { hashPwd } = utils.hashing(pwd, user.salt);

    if (user.pwd !== hashPwd) throw new Error('비밀번호가 틀립니다');

    return user;
  }

  async join(email, hashPwd, nickName, salt) {
    await User.create({
      email,
      pwd: hashPwd,
      nickName: nickName,
      salt,
    });
  }
}

const userService = new UserService();
module.exports = userService;
