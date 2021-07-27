//모델은 스키마를 감싸주는 역할    스키마는 민액 싱픔에 대한 글을 작성한다면 누가 작성했는지 제목에대한 type, 최대길이 나 설명에 대한 것을  하나하나지정해줄 수 있는 것이다.
const mongoose=require('mongoose');

const bcrypt=require('bcrypt');
const saltRounds=10;//salt가 몇글자인지 나타내는 것 10자리인 salt를 만들후 이용해서 비밀번호를 암호화한다
//salt를 이용해서 비밀번호를 암호화한다 그래서 그전에 salt를 먼저생성해야한다.

const jwt = require('jsonwebtoken');

const userSchema= mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, //이메일에 빈칸을 입력했을 때 없애주는 역할
        unique:1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{ // 유저중 관리자또는 일반 유저가 있을 수 있으니. 
        type: Number,
        default: 0
    },
    image: String,
    token:{ //유효성관리
        type: String
    },
    tokenExp:{ //유효기간 token이 사용할 수 있는 기간.
        type: Number
    }
})

userSchema.pre('save',function(next){
    //비밀번호를 암호화 시킨다.
    var user=this; //위의 스키마를 가리킴
    if(user.isModified('password')){ //비밀번호를 바꿀 때만 암호화 해주겠다.
        bcrypt.genSalt(saltRounds, function(err, salt) {   //salt만드는 것.
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) { //user.password는 내가 넣은 비밀번호 (순수한), hash가 암호화된 것.
                if(err) return next(err);
                user.password=hash
                next()  //할거를 다 하고 끝나면 nextfuction으로 user.save로 넘기는 것
            })
        })
    }else{
        next()
    }
});//user정보를 저장하기 전에 (main.js의 user.save하기전) 무엇을 한다는 것


userSchema.methods.comparePassword = function(plainPassword, cb){
    //암호화된 비밀번호와 체크해야해 그래서 적은 비밀번호를 암호화 해서 둘이 맞는지봐야함.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용해서 token생성하기
    var user=this;
    var token= jwt.sign(user._id.toHexString(),'secretToken'); //user._id+'secretToken'=token해서 나오는 것을 token으로 비교.
    user.token=token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}

//client의 쿠키안에 있는 토큰을 가져와서 서버의 데이터베이스의 토큰과 비교해서 인증을 했다. 
userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // user._id + '~~~'  = token
    //토큰을 decode 한다. 
    jwt.verify(token, 'secretToken', function (err, decoded) {  //decoded 된거는 user._id이다.
        //유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {  //findOne는 몽고DB에 있는 메소드
            if (err) return cb(err);
            cb(null, user)
        })
    })
}


const User=mongoose.model('User',userSchema);//스키마를 모델로 감싸주는 것  이모델의 이름은 User다

module.exports={User}//다른곳에서도 쓸 수 있게