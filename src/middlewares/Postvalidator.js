const error = require("./errorConstructor");

module.exports = class PostValidator {
  constructor(req) {
    this.body = req.body || undefined;
  }

  titleValidate = (title) => {
    const titleReg = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w|\s]{1,20}$/;
    return titleReg.match(title);
  };

  contentValidate = (content) => {
    const contentReg = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w|\s|\n]{1,200}$/g;
    return contentReg.match(content);
  };

  postPassvalidate = (password) => {
    const postPasswordReg = /^(?=.*[\d])(?=.*[\S]).{6,20}$/g;
    return postPasswordReg.match(password);
  };

  createValidator = () => {
    const { title, content } = this.body;
    const password = this.body.password | undefined;
    if (!title && !content) {
      throw new error("KeyError", 409);
    }
    const isValidTitle = this.titleValidate(title);
    const isValidContent = this.contentValidate(content);
    const isValidPassword = password
      ? this.postPassvalidate(password)
      : undefined;

    if (!(isValidTitle && isValidContent && isValidPassword)) {
      throw new error("Invalid_Value", 400);
    }
  };

  updateValidator = () => {
    const { title, content } = req.body;

    const isValidTitle =
      title && title !== "" ? this.titleValidate(title) : true;
    const isValidContent =
      content && content !== "" ? this.contentValidate(content) : true;

    if (!(isValidContent && isValidContent)) {
      throw new error("Invalid_Value", 400);
    }
  };
};
