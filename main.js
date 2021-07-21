//----------------------------------------express
const express=require('express');
const app=express();
const port=3000;

//-----------------------------------------mongoose
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://JoHyunHo:qwer1234@login.vfoj6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {   //몽고디비에 연결하는 부분 , 객체부분은 에러안뜨게 하기 위해.
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false,
}).then(()=>console.log('MongDB Connected...'))
    .catch(err=>console.log(err)) 





app.get('/',(req,res)=>res.send('Hello World!'));

app.listen(port,()=>console.log(`Example app listenling on port ${port}!`))