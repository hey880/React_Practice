import React,{useState, useEffect, useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {재고context} from './App.js';

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

    useEffect(()=>{
     let 타이머 = setTimeout(()=>{setAlert(false)},2000); 
     return ()=>{ clearTimeout(타이머)} 
    }, [alert]) 

    let {id} = useParams();
    let history = useHistory();
    let prd = props.shoes.find(x=>x.id == id);

    return(
          <div className="container">
            <박스>
              <제목 className="red">Detail</제목>
            </박스>
            
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
                <div> <Info 재고={props.재고}></Info> </div>
                <button className="btn btn-danger"
                onClick={()=>{props.재고변경([9,10,11])}}>주문하기</button>
                <button className="btn btn-danger" onClick={()=>{
                  // history.goBack();
                  history.push('/'); 
                }}>뒤로가기</button>
              </div>
            </div>
          </div>
    )
}

function Info(props){
  return (
    <p>재고 : {props.재고[0]}</p>
  )
}

export default Detail;