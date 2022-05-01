import React, { Component } from "react";
import ProductDataService from "../services/product.service";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        name: "",
        description: "",
        model: "",
        make: "",
        price: null,
        stock: null,
        sellerid: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }

  onChangeStock(e) {
    const stock = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          stock: stock
        }
      };
    });
  };

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          price: price
        }
      };
    });
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


  updateProduct() {
    ProductDataService.update(
      this.state.currentProduct.id,
      this.state.currentProduct.price,
      this.state.currentProduct.stock
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Product was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduct() {    
    ProductDataService.delete(this.state.currentProduct.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Products')
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
                  className="form-control"
                  id="price"
                  value={currentProduct.price}
                  onChange={this.onChangePrice}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  className="form-control"
                  id="stock"
                  value={currentProduct.stock}
                  onChange={this.onChangeStock}
                />
              </div>

            </form>



            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduct}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduct}
            >
              Update
            </button>
            <p>{this.state.message}</p>
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
