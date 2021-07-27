const { User } = require('../model/User');

let auth = (req, res, next) => {
    //인증 처리를 하는곳 
    //1. 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    //2.토큰을 복호화 한후  유저를 찾는다.  유저 있으며 okay 없으면 no
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })
        req.token = token;
        req.user = user;
        next(); //콜백함수전에 auth에서 일어나는일이 다끝났으면 콜백으로 넘어가라는 next이다.
    })
}


module.exports = { auth };