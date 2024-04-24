const errTemplate = require('../error/errTemplate');
const utils = require('../utils/utils');

class OrderValidator {
  static orderValueCheck(req, res, next) {
    const { items, address, consignee, phoneNumber, paymentMethod } = req.body;

    if (!items || !items[0]) return res.status(400).json(errTemplate.msg('주문할 아이템이 없습니다'));

    if (utils.isNotValidOrderItems(items)) {
      return res.status(400).json(errTemplate.msg('도서 정보가 누락되었거나 유효한 형식이 아닙니다'));
    }

    if (!address) return res.status(400).json(errTemplate.msg('주소를 입력하세요'));

    if (!consignee) return res.status(400).json(errTemplate.msg('받는 사람을 입력하세요'));

    if (!phoneNumber) return res.status(400).json(errTemplate.msg('전화번호를 입력하세요'));

    if (!paymentMethod) return res.status(400).json(errTemplate.msg('결제 방법을 선택하세요'));

    next();
  }
}

module.exports = OrderValidator;
