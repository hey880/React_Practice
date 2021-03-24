import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from "react-bootstrap";
import "./App.css";
import Data from "./data.js";
import { Route, Link, Switch, useHistory} from "react-router-dom";
//import Detail from './Detail';
import axios from 'axios';

import Cart from './Cart.js';

let Detail = lazy(()=> import ("./Detail.js"));


export let 재고context = React.createContext();

function App() {

  let [재고, 재고변경] = useState([10,11,12]);

  let [shoes, shoes변경] = useState(Data);

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand> 
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
        
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/detail">
              Detail
            </Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    <Switch>
      <Route exact path="/">
        <div>
          <Jumbotron className="background">
            <h1>20% Season OFF</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          <div className="container">

            <재고context.Provider value={재고}>

            <div className="row">
              { 
                shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i} key={i} />;
                 
                })
              }

            </div>  
          </재고context.Provider>
          
          </div>

          <button className="btn btn-primary" onClick={()=>{
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{
            shoes변경([...shoes, ...result.data])
          })
          .catch(()=>{ })
        }}>더보기</button>

        </div>
      </Route>

      <Route path="/detail/:id">

        <재고context.Provider value={재고}>
          <Suspense fallback={<div>로딩중입니다.</div>}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
          </Suspense>
        </재고context.Provider>

      </Route>

      <Route path="/cart">
        <Cart></Cart>
      </Route>

    </Switch>    

      
    </div>
  );
}

function Card(props) {
  
  let 재고 = useContext(재고context);
  let history = useHistory();
  //onClick은 <컴포넌트 /> 여기에 달기보다는 이 컴포넌트 함수를 찾아가서 그 함수의 return 값 내의 최상위 div에 달아준다.
  return (
    <div className="col-md-4" onClick={()=>{history.push('/detail/'+props.shoes.id)}}>
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} &{props.shoes.price}
      </p>
      {재고[props.i]}
      <Test></Test>
    </div>
  );
}

function Test(){
  let 재고 = useContext(재고context);
  return <p>{재고}</p>
}

export default App;
