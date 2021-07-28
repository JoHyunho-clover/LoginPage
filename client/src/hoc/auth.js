//HOC=> 인증절차 > 아무나 진입가능, 로그인 한 회원만, 로그인한 회원은 진입 X(또 로그인이나 회원가입에 대한 접근을 막는 것), 관리자만 진입 가능.
//페이지 인증 뿐만아니라 댓글작성, 파일전송, 파일 업로드>> 로그인한 회원만 가능하게.
//HOC higher order component > 함수인데 다른 component를 받은다음에 새로운 component를 리턴하는 함수이다.
//auth컴포넌트(HOC)안에 다른 컴포넌트를 집어넣을 수 있다. 
//auth가 backend로 request를 보내 그러면 backend는 현재유저의 상태 정보를 가져온다.(로그인이 되어있는지 안되어있는지 관리자인지를) 그러면 이페이지에 들어와도 된다와 안된다를 판단해서 안되면
//안된다는 것을 auth가 판단을 해서 다른페이지로 보내는 것이다. 페이지에 대한 인증을 contol한다.
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 하지 않은 상태 
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    //로그인 한 상태 
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}