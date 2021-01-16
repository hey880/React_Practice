import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from "react-bootstrap";
import "./App.css";
import Data from "./data.js";
import { Route, Link, Switch } from "react-router-dom";
import Detail from './Detail';
import axios from 'axios';

//1. context 만들기 (React.createContext()로 범위생성, 이 범위의 이름은 재고context) 다른 파일에서 쓰려면 이 범위를 export할 수 있고 이걸 쓰려는 다른 파일에서
//import {재고context} from './App.js'; 이렇게 import해서 쓸 수 있음
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
              {/* Nav.Link를 Link처럼 사용해달라는 의미 */}
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

            {/* //2. 같은 값을 공유할 HTML들을 <범위.Provider>로 싸매기. value={공유하고 싶은 값}을 적음 */}
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
        <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
        </재고context.Provider>

      </Route>

      <Route path="/:id"> 
        <div>/뒤에 아무거나 적으면 이거 보여줘라</div>
      </Route>
    </Switch>    

      
    </div>
  );
}

//3. 얘는 이제 공유된 재고라는 state를 마음대로 갖다 쓸 수 있음
function Card(props) {

  let 재고 = useContext(재고context);
  //useContext(범위이름)로 공유된 값 사용 가능

  return (
    <div className="col-md-4">
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
