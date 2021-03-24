import axios from 'axios';
import React, { useEffect, memo } from 'react';
import {Table} from 'react-bootstrap';
import {connect} from 'react-redux';

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
        
         { props.state.map((a,i)=>{
             return(
              <tr key={i}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.quan}</td>
                  <td><button onClick={()=>{props.dispatch(
                    //몇번째 상품을 수정할 건지도 담아서 보내자
                    //데이터: a.id 로 데이터라는 이름에 a.id번째 상품을 수정하도록 값을 담음
                    //장바구니에 담긴 상품인 a의 고유한 번호인 id로 설정한 것
                  {type:'수량증가', 데이터: a.id })}}>+</button></td>
                  <td><button onClick={()=>{props.dispatch({type:'수량감소', 데이터 : a.id})}}>-</button></td>
              </tr>
             )
          })}
       
      </Table>

     { props.alert열렸니 === true ?
    ( <div className="my-alert2">
          <p>지금 구매하시면 신규할인 20%</p>
          {/*닫기 버튼도 데이터수정하는 법 만들고 dispatch하면됨*/}
          <button onClick={()=>{props.dispatch({type:'닫기'})}}>닫기</button>
      </div>) : null
    }
    <Parent 이름="존박" 나이="20"></Parent>
    </div>
  )
}

function state를props화(state){
    return{
        state : state.reducer, //첫 리듀서에 담긴 데이터
        alert열렸니 : state.reducer2 //reducer2에 담긴 데이터
    }
}

//예시용 컴포넌트 3개

function Parent(props) {
  //props값이 변경되면 props가 변경된 컴포넌트만 재렌더링 되는 게 아니라
  //아래의 <div> 안에 있는 모든 내용이 재렌더링 됨

  //props가 변경되지 않은 컴포넌트는 재렌더링하지 말아주세요 = memo() 사용
  //컴포넌트를 memo라는 함수로 감싸면 된다. 1. memo를 import
  //2. memo로 컴포넌트를 감쌈. (Child2 참고)
  //3. 해당 컴포넌트와 관련된 props 가 변경 됐을 때만 재렌더링 된다.

  //브라우저 개발자도구에서 react dev tool 의 component 에서 cart의 props 값을 변경 후 console창을 확인 해보면 변경된 props를 가진 컴포넌트만 재렌더링 되는 걸 볼 수 있다.

  //단점 : 기존 props와 바뀐 props를 비교연산 후 수정된 게 있으면 컴포넌트를 업데이트 하기 때문에
  //props가 많을 시 사이트가 느려질 수밖에 없다.
  //따라서 컴포넌트 사이즈가 클 때 정도만 사용하면 좋다.
  return (
    <div>
      <Child1 이름={props.이름}></Child1>
      <Child2 나이={props.나이}></Child2>
    </div>
  )
}

function Child1(props){
  useEffect(()=>{ console.log('렌더링됨1') });
  return <div>1111</div>
}
let Child2 = memo(function (){
  useEffect(()=>{ console.log('렌더링됨2') });
  return <div>2222</div>
})

export default connect(state를props화)(Cart);