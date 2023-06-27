import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "./../../images/logo.png";
import {MdAccountCircle} from "react-icons/md";
import {MdSearch} from "react-icons/md";
import {MdShoppingCart} from "react-icons/md";
const options = {
  burgerColor: "#7d8590",
  burgerColorHover: "#6e40c9",
  logo,
  logoWidth: "15vmax",
  navColor1: "#12161d",
  logoHoverSize: "10px",
  logoHoverColor: "white",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "#7d8590",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "white",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIcon: true,
  profileIconColor: "#7d8590",
  ProfileIconElement: MdAccountCircle,
  profileIconMargin: "10",
  searchIcon: true,
  searchIconColor: "#7d8590",
  SearchIconElement: MdSearch,
  searchIconMargin: "10",
  cartIcon: true,
  CartIconElement: MdShoppingCart,
  cartIconColor: "#7d8590",
  cartIconMargin: "10",
  profileIconColorHover: "white",
  searchIconColorHover: "white",
  cartIconColorHover: "white",
};
const Header = () => {
  return(
    <ReactNavbar {...options} />
  )
};

export default Header;
