import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
    <div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
      </Switch>
    </div>
  </Router>
  )
}

export default App

//만약에 한유저가 로그인을 하면 client에서 아이디와 비밀번호를 넣는데 이때 요청이 서버에 가서 서버에서는 데이터베이스에 해당하는 아이디가 있는지 보고
//아이디가 있으면 보내준 비밀번호가 유저아이디에 맞는 비밀번호가 체크를 해주는 역할을 해준다. response를 해준다.
//request를 보낼때 AXIOS를 사용한다.