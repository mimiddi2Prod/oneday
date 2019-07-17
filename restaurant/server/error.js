function FBError(){
    this.OKCode = 0;
    this.OK = {code:this.OKCode, text:"操作成功"};
    
    this.ErrorWhenMakeResponseCode = 1;
    this.ErrorWhenMakeResponse = {code:this.ErrorWhenMakeResponse, text:"返回数据解析异常"};

    this.ErrorPathCode = 2;
    this.ErrorPathCode = {code: this.ErrorPathCode, text: "请求路径有误"};

    this.ErrorNotOpIdCode = 3;
    this.ErrorNotOpId = {code: this.ErrorNotOpIdCode, text: "找不到opid"};

    this.ErrorNotPhoneCode = 4;
    this.ErrorNotPhone = {code: this.ErrorNotPhoneCode, text: "无效的手机号码"};

    this.ErrorNotVCodeCode = 5;
    this.ErrorNotVCode = {code: this.ErrorNotVCodeCode, text: "没有输入验证码"};

    this.ErrorVCodeCode = 6;
    this.ErrorVCode = {code: this.ErrorVCodeCode, text: "无效的验证码"};

    this.ErrorSQLCode = 7;
    this.ErrorSQL = {code: this.ErrorSQLCode, text: "数据库错误"};

    this.ErrorUserAlreadyExistCode = 8;
    this.ErrorUserAlreadyExist = {code: this.ErrorUserAlreadyExistCode, text: "此用户已存在"};

    this.ErrorUserTypeCode = 9;
    this.ErrorUserType = {code: this.ErrorUserType, text: "错误的用户类型"};

    this.ErrorNotNickNameCode = 10;
    this.ErrorNotNickName = {code: this.ErrorNotNickNameCode, text: "无效的昵称"};

    this.ErrorCatchedCode = 11;
    this.ErrorCatch = {code: this.ErrorCatchedCode, text:"未知的异常"};

    this.ErrorNotFoundUserCode = 12;
    this.ErrorNotFoundUser = {code: this.ErrorCatchedCode, text:"找不到该用户"};

    this.ErrorUserStateCode = 13;
    this.ErrorUserState = {code: this.ErrorUserStateCode, text:"此用户被禁止登录"};

    this.ErrorNotFoundBoxIdCode = 14;
    this.ErrorNotFoundBoxId = {code: this.ErrorNotFoundBoxIdCode, text:"找不到此餐柜"};

    this.ErrorNotFoundBoxSizeCode = 15;
    this.ErrorNotFoundBoxSize = {code: this.ErrorNotFoundBoxSizeCode, text:"找不到餐格尺寸"};

    this.ErrorNotFoundCustomVCodeCode = 16;
    this.ErrorNotFoundCustomVCode = {code: this.ErrorNotFoundCustomVCodeCode, text:"请输入取餐验证码"};

    this.ErrorNotFoundSuitableBoxCode = 17;
    this.ErrorNotFoundSuitableBox = {code: this.ErrorNotFoundSuitableBoxCode, text:"没有找到满足条件的柜子"};

    this.ErrorNotSuitableFoodBoxCode = 18;
    this.ErrorNotSuitableFoodBox = {code: this.ErrorNotSuitableFoodBoxCode, text:"没有合适的餐格"};

    this.ErrorNotGridIdCode = 19;
    this.ErrorNotGridId = {code: this.ErrorNotGridIdCode, text:"没有格子id"};

    this.ErrorBranchCode = 20;
    this.ErrorBranch = {code: this.ErrorBranchCode, text:"没有合适的业务分支"};

    this.ErrorNotPullVCodeCode = 21;
    this.ErrorNotPullVCode = {code: this.ErrorNotPullVCodeCode, text:"没有找到取餐码"};

    this.ErrorNotAllowCode = 22;
    this.ErrorNotAllow = {code: this.ErrorNotAllowCode, text:"无授权"};

    this.ErrorNotPostmanIdCode = 23;
    this.ErrorNotPostmanId = {code: this.ErrorNotPostmanIdCode, text:"没有派送员的id"};
}

module.exports = FBError;