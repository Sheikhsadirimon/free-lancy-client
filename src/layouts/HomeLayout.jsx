import React from "react";
import Header from "../components/Header";
import { Outlet, useNavigation } from "react-router";
import Footer from "../components/Footer";
import Loading from "../pages/Loading";

const HomeLayout = () => {
  const { state } = useNavigation();
  return (
    <div>
      <Header></Header>
      {state == "loading" ? <Loading></Loading> : <Outlet></Outlet>}
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
