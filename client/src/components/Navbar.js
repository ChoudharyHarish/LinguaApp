import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import logo from "../img/logo.png";

const Navbarr = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [isAuthenticated]);

  useEffect(() => {
    const scroll = () => {
      window.scrollY > 50 ? setScrolled(true) : setScrolled(false);
    };
    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  const openCart = (e, elem) => {
    e.preventDefault();
    const el = document.querySelector(elem);
    el?.classList.add("showCart");
    el?.classList.remove("hidecart");
  };


  return (
    <Navbar className={scrolled ? "scrolled" : "blurNav"} expand="lg">
      <Container>
        <div className="flex justify-between w-100">
        <div className="flex gap-4">
          <Navbar.Brand href="/" className="flex gap-2 flex-1">
            <img src={logo} alt="" className="h-12 w-12 rounded-full" />
            <p className="text-white my-auto">LinguaLeap</p>
          </Navbar.Brand>
          <Link to={`/leaderBoard?lang=${user?.language}`} className="text-white text-decoration-none my-auto">
            Leaderboard
          </Link>
        </div>

          <div className="navbar-text lg:w-auto relative">
            <div className="social-icons justify-between text-black">
              {user ? (
                user.imageUrl ? (
                  <Avatar
                    sx={{ backgroundColor: "#6c7ae0", cursor: "pointer" }}
                    onClick={(e) => openCart(e, ".user")}
                    src={user.imageUrl}
                  />
                ) : (
                  <Avatar
                    sx={{ backgroundColor: "#6c7ae0", cursor: "pointer" }}
                    onClick={(e) => openCart(e, ".user")}
                  >
                    {user?.name.slice(0, 1)}
                  </Avatar>
                )
              ) : (
                <PersonIcon
                  className="cursor-pointer"
                  style={{ fontSize: 28, color: "white" }}
                  onClick={(e) => openCart(e, ".user")}
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
