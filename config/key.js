//mongo DB의 주소를 local환경에서는 developmnet모드에서 / 배포한뒤에는 헤로크서비스나 어떤 클라우드를 이용해서 production..하는 걸로 분기해줘야한다.
if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod')
}else{
    module.exports=require('./dev')
}