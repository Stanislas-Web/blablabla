import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import "../assets/css/TheHeader.scss";
import logo from "../assets/img/armoirie_pres.png";
import partner from "../assets/img/partner.png";

export default function Header() {
  return (
    <>
      <header>
        <Navbar bg="white" expand="sm">
          <Navbar.Brand href="#/">
            <img
              src={logo}
              style={{height:"60px", width:"60px",marginTop:"2px"}}
              className="d-inline-block align-top fluide"
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"  className="justify-content-end">
            <Nav className="mr-sm-2 " defaultActiveKey="#/">
              <Nav.Link href="#/" style={{fontWeight:"300"}}>Situation actuelle</Nav.Link>
              <Nav.Link href="#structures" style={{fontWeight:"300"}}>
                Structures d'accompagnement
              </Nav.Link>
              <Nav.Link href="#plaintes" style={{fontWeight:"300"}}>Soumettre un cas</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </>
  );
}
