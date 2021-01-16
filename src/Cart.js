import React from 'react';
import {Table} from 'react-bootstrap';
import {connect} from 'react-redux';

//3. props처럼 store값들을 데이터바인딩 해서 쓸 수 있다.
function Cart(props){
  return (
    <div>
      <Table responsive>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        <tr>
          <td>1</td>
          <td>{props.state[0].name}</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
      </Table>
    </div>
  )
}
//1. index.js에 저장한 store 안의 state를 props 화
//{ 원하는이름 : state } 이러면 store안에 있던 모든 state 데이터가 props로 등록됨
function state를props화(state){
    return{
        //상품명 : state[0].name
        state : state
    }
}

//2. connect함수에 위의 함수를 넣음. react-redux라이브러리 사용법.
//이러면 redux store에 있던 데이터들이 props로 엮인 채로 컴포넌트가 export 된다.
export default connect(state를props화)(Cart);