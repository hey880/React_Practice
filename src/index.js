import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {BrowserRouter} from 'react-router-dom';

//redux에서 state 만드려면 screateStore() 함수 이용. 일단 import해오고.
//콜백 함수 안에 원하는 state 초기값을 저장.
let store = createStore(()=>{ return [{id : 0, name : '멋진신발', quan : 2}] })
//이렇게 만든 state를 Provider에 props처럼 등록.
//리덕스에서는 state들을 store라고 부른다.

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

