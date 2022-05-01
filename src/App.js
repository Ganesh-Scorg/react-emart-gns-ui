import react, {Component} from "react"
import {Switch, Route, Link} from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import ProductsList from "./components/products-list.component";
import Product from "./components/product.component";
import AddProduct from "./components/add-product.component";

class App extends Component {
  render() {
  return (
     <div>
     <nav className="navbar navbar-expand navbar-dark bg-dark">
       <Link to={"/products"} className="navbar-brand">
         GNS Emart
       </Link>
       <div className="navbar-nav mr-auto">
         <li className="nav-item">
           <Link to={"/tutorials"} className="nav-link">
             Tutorials
           </Link>
         </li>
         <li className="nav-item">
           <Link to={"/add"} className="nav-link">
             Add
           </Link>
         </li>
         <li className="nav-item">
           <Link to={"/products"} className="nav-link">
             Products
           </Link>
         </li>
       </div>
     </nav>
     <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
            <Route exact path={["/", "/products"]} component={ProductsList} />
            <Route path="/products/:id" component={Product} />
            <Route exact path="/add" component={AddProduct} />
            <Route path="/tutorials/:id" component={Tutorial} />
          </Switch>
      </div>
    
   </div>
  );
}
}

export default App;
