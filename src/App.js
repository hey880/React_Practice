import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from "react-bootstrap";
import "./App.css";
import Data from "./data.js";
import { Route, Link, Switch } from "react-router-dom";
import Detail from './Detail';

function App() {

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
            <div className="row">
              {
                //a는 가져올 shoes라는 array안에 있는 데이터 하나하나를 의미
                //i는 반복될 숫자 0,1,2
                shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i} key={i} />;
                  //return <Card shoes{a}/> 이것도 위와 결과가 같다.
                })
              }
            </div>
          </div>
        </div>
      </Route>

      <Route path="/detail/:id">
        <Detail shoes={shoes}/>
      </Route>

      <Route path="/:id"> 
        <div>/뒤에 아무거나 적으면 이거 보여줘라</div>
      </Route>
    </Switch>    

    </div>
  );
}

function Card(props) {
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
    </div>
  );
}

export default App;
