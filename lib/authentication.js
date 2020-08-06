class Authentication {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    doing() {
        if(!this.req.session.user) {
            this.res.json({
                code: 2,
                message: '你没有登录',
                data: '你没有权限访问'
            });
            return false;
        } else {
            return true;
        }
    }
}

module.exports = Authentication;
