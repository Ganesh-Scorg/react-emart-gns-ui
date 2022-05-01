import React, { Component } from "react";
import ProductDataService from "../services/product.service";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeDOM = this.onChangeDOM.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
        id: null,
        name: "",
        description: "",
        model: "",
        make: "",
        price: null,
        stock: null,
        sellerid: "",

      submitted: false
    };
  }

  onChangeID(e) {
    this.setState({
      id: e.target.value
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeModel(e) {
    this.setState({
      model: e.target.value
    });
  }

  onChangeDOM(e) {
    this.setState({
      make: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeStock(e) {
    this.setState({
      stock: e.target.value
    });
  }

  saveProduct() {
    var data = {
      id: this.state.id,
      name: this.state.name,      
      description: this.state.description,
      model: this.state.model,
      make: this.state.make,
      price: this.state.price,
      stock: this.state.stock
    };

    ProductDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          model:  response.data.model,
          make:  response.data.make,
          price:  response.data.price,
          stock:  response.data.stock,
         
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
        id: null,
        name: "",
        description: "",
        model: "",
        make: "",
        price: null,
        stock: null,
        sellerid: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <div>
             <form>
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  value={this.state.id}
                  onChange={this.onChangeID}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  value={this.state.model}
                  onChange={this.onChangeModel}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="manufacturedDate">Date of Manufactured</label>
                <input
                  type="date"
                  className="form-control"
                  id="manufacturedDate"
                  value={this.state.make}
                  onChange={this.onChangeDOM}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  className="form-control"
                  id="stock"
                  value={this.state.stock}
                  onChange={this.onChangeStock}
                />
              </div>

            </form>


            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
