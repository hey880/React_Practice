import React,{useState, useEffect, useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {재고context} from './App.js';
import {Nav} from 'react-bootstrap';

import { CSSTransition } from "react-transition-group";

let 박스 = styled.div`
  padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상 }
`;

function Detail(props){
 
  const [alert, setAlert] = useState(true);
  //true 일 때만 원하는 코드 보이게 하기 위한 상태 저장
  let 재고 = useContext(재고context);

  //Tab 값을 저장할 state
  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

    useEffect(()=>{
     let 타이머 = setTimeout(()=>{setAlert(false)},2000); 
     return ()=>{ clearTimeout(타이머)} 
    }, [alert]) 

    let {id} = useParams();
    let history = useHistory();
    let prd = props.shoes.find(x=>x.id == id);

    return (
      <div className="container">
        <박스>
          <제목 className="red">Detail</제목>
        </박스>

        {alert === true ? (
          <div className="my-alert">
            <p>재고가 얼마 남지 않았습니다</p>
          </div>
        ) : null}

        <div className="row">
          <div className="col-md-6">
            <img
              src="https://codingapple1.github.io/shop/shoes1.jpg"
              width="100%"
            />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{prd.title}</h4>
            <p>{prd.content}</p>
            <p>{prd.price}원</p>
            <div>
              {" "}
              <Info 재고={props.재고}></Info>{" "}
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                props.재고변경([9, 10, 11]);
              }}
            >
              주문하기
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                // history.goBack();
                history.push("/");
              }}
            >
              뒤로가기
            </button>
          </div>
        </div>
        {/*mt-5 는 margin-top:5, bootstrap이 제공하는 기본 class*/}
        {/*defaultActiveKey는 어떤 걸 누른 것처럼 실행해달라고 기본으로 정해
        두는 값*/}
        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            {/*버튼들 마다 유니크한 eventKey 부여하기, 스위치 누르면 애니메이션
            동작 안되게 false 되게 해둠. 아래 컴포넌트에서 useEffect로 컴포넌트 로드시
            동작하게 true로 바꿔주고.*/}
            <Nav.Link eventKey="link-0" onClick={()=>{스위치변경(false); 누른탭변경(0)}}>Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={()=>{스위치변경(false); 누른탭변경(1)}}>Option 2</Nav.Link>
          </Nav.Item>
        </Nav>

        <CSSTransition in={스위치} className="wow" timeout={500}>
         <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
        </CSSTransition>

      </div>
    );
}
//평소에는 false로(안 움직이게) 해놨다가 컴포넌트 업데이트, 로드시에만 움직이게
function TabContent(props){
  //if문을 구현하려면 컴포넌트를 하나 만들어야함.
  useEffect(()=>{
    props.스위치변경(true);
  })

  if (props.누른탭 === 0) {
    return <div>0번째 내용입니다.</div>
  }else if(props.누른탭 === 1){
    return <div>1번째 내용입니다.</div>
  }else if(props.누른탭 === 2){
    return <div>2번째 내용입니다.</div>
  }
}

function Info(props){
  return (
    <p>재고 : {props.재고[0]}</p>
  )
}

export default Detail;