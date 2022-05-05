import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import Invoice from "./invoice.component"
import {Switch, Route, Link} from "react-router-dom"

export default class PurchaseProduct extends Component {
  constructor(props) {
    super(props);
    this.getProduct = this.getProduct.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.buyProduct = this.buyProduct.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        name: "",
        description: "",
        model: "",
        make: "",
        price: null,
        stock: null,
        sellerid: "",
      },
      message: "",
      quantity: "",
      billedAmount: 0,
      isPurchased: false,
      responseInvoice: ""
    };
  }

  componentDidMount() {
    this.setState({
      isPurchased: false
     });
    this.getProduct(this.props.match.params.id);
  }

  onChangeQuantity = (e) => {
    this.setState({quantity: e.target.value,
        billedAmount: e.target.value*this.state.currentProduct.price
    });
    //this.setState({billedAmount: this.state.quantity*this.state.currentProduct.price});
  };

  
  getProduct(id) {
    ProductDataService.get(id)
      .then(response => {
        this.setState({
          currentProduct: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  selectProduct() {
    ProductDataService.selectProduct(
      this.state.currentProduct.id,
      this.state.quantity
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Product added to the Cart!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  buyProduct() {
    ProductDataService.buyProduct(
      this.state.currentProduct.id,
      this.state.quantity
    )
      .then(response => {
          this.setState({
             responseInvoice: response.data,
             isPurchased: true
            });
          console.log(this.state.responseInvoice);
      })
      .catch(e => {
        console.log(e);
      });
  }

  

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product</h4>
            <form>
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="id"
                  value={currentProduct.id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="name"
                  value={currentProduct.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="model"
                  value={currentProduct.model}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="description"
                  value={currentProduct.description}
                />
              </div>
              <div className="form-group">
                <label htmlFor="manufacturedDate">Date of Manufactured</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="manufacturedDate"
                  value={currentProduct ? currentProduct.make.substr(0,10) : ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="price"
                  value={currentProduct.price}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  value={this.state.quantity}
                  onChange={this.onChangeQuantity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="billedAmount">Total Bill</label>
                <input
                  type="text"
                  className="form-control"
                  id="billedAmount"
                  value={this.state.billedAmount}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.selectProduct}
            >
              Add to cart
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.buyProduct}
            >
              Buy
            </button>
            
            <div>{
            this.state.isPurchased ? <Invoice responseInvoice={this.state.responseInvoice}></Invoice> : 
            <div><span> { this.state.message}</span> <Link to={"/products/"} className="badge badge-warning">
            Shop more </Link> </div>
            } </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}
