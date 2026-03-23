import React from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ProductList from "./components/ProductList";
import ProductCard from "./components/ProductCard";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Resume from "./components/Resume";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:productId" component={ProductCard} />
        <Route exact path="/about" component={AboutMe} />
        <Route exact path="/skills" component={Skills} />
        <Route exact path="/resume" component={Resume} />
      </Switch>
    </>
  );
}

export default App;
