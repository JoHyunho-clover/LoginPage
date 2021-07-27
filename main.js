//----------------------------------------서버만든는 것 ----------------
//----------------------------------------express
const express=require('express'); //>>node js를 가지고 웹사이트나 어플리케이션을 쉽게 만들수 있게 도와주는 프래임워크
const app=express();
const port=3000;

//------------
const {User}=require("./model/User")
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended: true})); //application/x-ww-form-urlencoded처럼 생긴 데이터를 분석해서 가져올수 있게 해주는것
app.use(bodyParser.json()); //application/json 타입으로 된것을 분석해서 가져올 수 있또록 하기 위해서

//-----------몽고DB정보를  비밀로 하기.

const config=require('./config/key');

//cookie-parser가져오기
const cookieParser=require('cookie-parser');
app.use(cookieParser());

//-----------------------------------------mongoose
const mongoose=require('mongoose');
mongoose.connect(config.mongoURI, {   //몽고디비에 연결하는 부분 , 객체부분은 에러안뜨게 하기 위해.
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false,
}).then(()=>console.log('MongDB Connected...'))
    .catch(err=>console.log(err)) 


//----------------------------------------express
app.get('/',(req,res)=>res.send('Hello World! 안녕'));

app.listen(port,()=>console.log(`Example app listenling on port ${port}!`))



//----------------------------------------회원가입기능 (client에서 이메일과 비밀번호를 입력후 서버에 보내고 서버에서 받아야하는데 
//                                                     받을때 Body-parser를 이용해서 clinet에서 보내주는 비번 이메일 이름을 받을 수 있다.
//                                                      Postman- 로그인이나 회원가입시 client를 만들어준것이 없어서 데이터를 client에서 보낼수 없어서 이거 사용.)
//회원가입을 위한 route를 만들면된다.
app.post('/register',(req,res)=>{
    //회원가입할떄 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
    const user= new User(req.body); //정보들을 데이터베이스에 넣기 위해.


    user.save((err,userInfo)=>{
        if(err) return res.json({success: false, err}) //client한테 error가 있다고 전달.
        return res.status(200).json({
            success: true
        })
    }) //req.body정보들이 user모델에 저장이 되는 것
})

//--------------------------------node mon
//node서버를 킨다음 node안에서 무엇을 바꿨으면 서버를 내렸다가 다시 기동을 시켜야 바꾼 소스가 반영이 된다
//하지만 node mon을 서버를 내리지 않아도 이용하면 알아서 변화된 부분을 반영해준다. (npm install nodemon --save-dev에서 -dev는 local에서만 사용하겠다라는 의미)
//nodemon으로 시작하기 위해서 script하나를 더 만들기?? package.json에서해라

//비밀정보>>mongoDB

//비밀번호 암호화 하기 >> Bcrypt npm install bcrypt --save 




//로그인 기능 만들기.
app.post('/login',(req,res)=>{
    //3가지 데이터베이스안에서 요청된 이메일 찾기, 요청한 이메일과 비밀번호가 같은지, 비밀번호가 같으면  토큰 생성
    //요청된 이메일 찾기
    User.findOne({email: req.body.email},(err,user)=>{
            if(!user){
                return res.json({
                    loginSuccess: false,
                    message: "제공된 이메일에 해당하는 유저가 없습니다."
                })
            }
        //이메일이 있다면 비밀번호가 맞는 것인지 확인.
            user.comparePassword(req.body.password, (err, isMatch)=>{
                if(!isMatch)
                    return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."}) 

                //비밀번호까지 맞다면 토근 생성.
                user.generateToken((err,user)=>{  //user에 토근이 저장되어있음
                    if(err) return res.status(400).send(err);

                    //토근을 저장한다. (쿠기 또는 로컬저장소에. 여기에서는 쿠기에=>cookie-parser깔아야됨.)
                    res.cookie("x_auth",user.token)
                        .status(200)
                        .json({loginSuccess: true, userId:user._id})
                })
        })
    })    
})


