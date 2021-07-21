//모델은 스키마를 감싸주는 역할    스키마는 민액 싱픔에 대한 글을 작성한다면 누가 작성했는지 제목에대한 type, 최대길이 나 설명에 대한 것을  하나하나지정해줄 수 있는 것이다.
const mongoose=require('mongoose');

const userSchema= mongoose.Schema({
    name:{
        type: String,
        maxlength: 50,
    },
    email:{
        type: String,
        trim: true, //이메일에 빈칸을 입력했을 때 없애주는 역할
    },
    password: {
        type: String,
        minlength: 50,
    },
    lastname:{
        type: String,
        maxlength: 50,
    },
    role:{ // 유저중 관리자또는 일반 유저가 있을 수 있으니. 
        type: Number,
        default: 0.,
    },
    image: String,
    token:{ //유효성관리
        type:String,
    },tokenExp:{ //유효기간 token이 사용할 수 있는 기간.
        type: Number,
    }
})

const User=mongoose.model('User',userSchema);//스키마를 모델로 감싸주는 것  이모델의 이름은 User다

module.exports={User}//다른곳에서도 쓸 수 있게