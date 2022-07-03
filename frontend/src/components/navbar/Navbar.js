import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      if (pathname === "/" || pathname === "/signup") {
        navigate("/addProduct", { replace: true });
      }
    }

    if (!token && pathname !== "/" && pathname !== "/signup") {
      navigate("/", { replace: true });
    }
  }, [pathname]);
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Link to={"/addProduct"} className="nav-link">
              Add product
            </Link>
            <Link to={"/chart"} className="nav-link">
              Charts
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
