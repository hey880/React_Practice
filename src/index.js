import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';

import {BrowserRouter} from 'react-router-dom';

//Cart.js의 Myalert2 알림창의 상태를 저장하는 state+reducer 
let alert초기값 = true;

function reducer2(state=alert초기값, 액션){
  if(액션.type === '닫기'){
    state=false;
    return state;
  }else{
    return state;
  }
}

let 초기값 = [
  {id : 0, name : '멋진신발', quan : 2},
  {id : 1, name : '멋진신발2', quan : 1}
];

function reducer(state = 초기값, 액션){
  if (액션.type === '항목추가'){
    
    //state안에 id : 액션.데이터 인게 있냐>

    let found = state.findIndex((a)=>{ return a.id === 액션.데이터.id}); //array안(초기값)의 값이랑 payload로 전달된 거 사이에 일치하는 값이 있으면 그게
    //몇번째에 있는 건지를 반환함

    if(found >= 0){
      let copy = [...state];
      copy[found].quan++; //몇번째 값인지를 찾아서 quan++ 해줌
      return copy
    }else{

      let copy = [...state];
      copy.push(액션.데이터);
      return copy;
    }

  }else if( 액션.type === '수량증가' ){//수량증가 라는 데이터 수정 방법 정의

    let copy = [...state]; //state 딥 카피로 카피본 만들고
    copy[액션.데이터].quan++; //state 수정 하고 수정된 state를 return
    //Cart.js에서 dispatch로 실어보낸 '데이터'(=a.id) 값을 인덱스 값으로 받아옴.

    return copy

  }else if( 액션.type === '수량감소' ){
    let copy = [...state];
    copy[액션.데이터].quan--;

    return copy

  }else{
    return state
  }
}
//store 만들 때 위에서 만들어둔 reducer 를 넣어줌
let store = createStore(combineReducers({reducer, reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}> 
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

