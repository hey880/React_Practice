import React,{useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

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

    useEffect(()=>{
     let 타이머 = setTimeout(()=>{setAlert(false)},2000); 
     return ()=>{ clearTimeout(타이머)} //컴포넌트가 사라질 때 타이머 해제시켜서 버그 방지
    }, [alert]) //alert라는 state가 update 될 때만 실행해달라는 조건을 붙임.
    //이런 조건을 붙이지 않으면 해당 컴포넌트가 update 될 때마다 계속 재렌더링되어 실행됨.
    //빈 대괄호만 적고 대괄호 안에 아무것도 넣지 않으면 컴포넌트가 동작할 때 딱 한 번만 실행되고
    //다시는 실행되지 않음.

    let {id} = useParams();
    let history = useHistory();
    let prd = props.shoes.find(x=>x.id == id);

    return(
          <div className="container">
            <박스>
              <제목 className="red">Detail</제목>
            </박스>
          
          {/*삼항연산자로 true일 경우 코드를 넣어주고 아닐경우 null을 넣어줌*/}
            {
              alert === true ? (  <div className="my-alert">
              <p>재고가 얼마 남지 않았습니다</p>
            </div>) : null
            }

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
                <button className="btn btn-danger">주문하기</button>
                <button className="btn btn-danger" onClick={()=>{
                  // history.goBack();
                  history.push('/'); 
                }}>뒤로가기</button>
              </div>
            </div>
          </div>
    )
}

export default Detail;