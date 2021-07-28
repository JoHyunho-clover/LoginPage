//서버는 포트번호가 5000 client는 3000이면 포트가 다르다 그러면 각각에 설정을 해주지 않으면 서로 request를 보낼때 cors정책때문에 막힌다
//cors정책- 다른웹사이트에서 우리서버에  무엇을 보내면 보안적 이슈가 생기는데 이러한 보안적이슈때문에 이것이 있다.
//cors정책을 해결하는방법은 개발자도구, proxy를 사용하는 방법이 있다.
//proxyserver ->유저가 무엇가를 보냈을때 1.방화벽기능 2.웹 필터기능 3.캐쉬데이터 공유데이터 제공 기능 
//4. 아이피를 proxyserver에서 임의로 바꿔버릴 수 있다(그래서 인터넷에서는 접근하는 사람의 ip를 모르게 된다), 5.보내는 데이터도 임의로 바꿀 수 있다.
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        })
    );
};