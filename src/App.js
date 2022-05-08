import react, {Component} from "react"
import {Switch, Route, Link} from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import ProductsList from "./components/products-list.component";
import Product from "./components/product.component";
import AddProduct from "./components/add-product.component";
import PurchseProduct from "./components/purchase-product.component"
import CartList from "./components/cart-list.component"
import PurchaseInvoice from "./components/purchase-invoice.component"
import PurchaseHistoryList from "./components/purchase-history-list.component"

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
           <Link to={"/products"} className="nav-link">
             Products
           </Link>
         </li>
         <li className="nav-item">
           <Link to={"/add"} className="nav-link">
             Add
           </Link>
         </li>
         <li className="nav-item">
           <Link to={"/cart"} className="nav-link">
             Cart
           </Link>
         </li>
         <li className="nav-item">
           <Link to={"/purchasehistory"} className="nav-link">
           PurchaseHistoryList
           </Link>
         </li>
       </div>
     </nav>
     <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/products"]} component={ProductsList} />
            <Route exact path={["/", "/cart"]} component={CartList} />
            <Route exact path={["/", "/purchasehistory"]} component={PurchaseHistoryList} />
            <Route path="/products/:id" component={Product} />
            <Route path="/invoice/:id" component={PurchaseInvoice} />
            <Route path="/viewproduct/:id" component={PurchseProduct} />
            <Route exact path="/add" component={AddProduct} />
          </Switch>
      </div>
    
   </div>
  );
}
}

export default App;
