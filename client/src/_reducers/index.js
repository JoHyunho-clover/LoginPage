import { combineReducers } from 'redux';
//store가 있는데 reducer들이 여러가지 있을 수 있는데 (reducer안에서 하는일이 어떻게 state가 변화하는 것을 보여준다음에 변한 마지막값을 return 해주는게 reducer다 )
//state가 user, subscribe 등 여러가지 있을 수 있어서 reducer가 나뉘어져있다
//우리는 combinereducer를 이용해서 여러가지 reducer를 rootreducer에서 하나로 합쳐주는 것을 이용.
import user from './user_reducer';

const rootReducer = combineReducers({
    user
})

export default rootReducer;