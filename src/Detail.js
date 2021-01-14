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
//

function Detail(props){
 
  // useEffect는 컴포넌트가 mount 됐을 때, 컴포넌트가 update될 때 
  // 특정 코드를 실행할 수 있음
    useEffect(()=>{
     let 타이머 = setTimeout(()=>{},2000); //setTimeout은 이런식으로 변수에 저장해서 주로 씀
      //return function 어쩌구() { 실행할 코드 } //unmount 될 때 실행됨
    })

    let {id} = useParams();
 
    //history라는 방문기록이 다 담기는 object
    let history = useHistory();
    let prd = props.shoes.find(x=>x.id == id);

    return(
          <div className="container">
            <박스>
              <제목 className="red">Detail</제목>
            </박스>
            <div className="my-alert">
              <p>재고가 얼마 남지 않았습니다</p>
            </div>
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