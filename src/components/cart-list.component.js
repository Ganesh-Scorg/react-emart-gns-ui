import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link, Redirect } from "react-router-dom";
import PurchaseInvoice from "./purchase-invoice.component"

class CartList extends Component {
  constructor(props) {
    super(props);
    this.retrieveSelectedProducts = this.retrieveSelectedProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      products: [],      
      currentProduct: null,
      currentIndex: -1,
      isProdAvailableInCart: false,
      isPurchased: false,
      responseinvoiceid: ''
    };
  }

  componentDidMount() {
    this.retrieveSelectedProducts();
  }


  retrieveSelectedProducts() {
    ProductDataService.getselectedProducts()
      .then(response => {
        this.setState({
          products: response.data
        });
        //console.log("Total products selected :");
        //console.log(this.products && this.products.length > 0);
      })
      .catch(e => {
        console.log(e);
        this.setState({
            products: []
          });
      });
  }

  refreshList() {
    this.retrieveSelectedProducts();
    this.setState({        
        currentProduct: null,
        currentIndex: -1,
        isProdAvailableInCart: false,
        isPurchased: false
    });
    this.isProdAvailableInCart ? document.getElementById('BuyAllButton').disabled = false : document.getElementById('BuyAllButton').disabled = true
    
  }

  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index
    });
  }

  deleteProduct(id) {    
    ProductDataService.removeselectedProducts(id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  buyAllSelected = () => {
    ProductDataService.buyAllProductsFromCart()
    .then(response => {
      console.log(response.data); 
      this.refreshList();
      this.setState({
        responseinvoiceid: response.data.invoiceid,
        isPurchased: true
      });
      
    })
    .catch(e => {
      console.log(e);
    });
  }

  clearCart = () => {    
    ProductDataService.removeAllselectedProducts()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
 
  render() {
    const { products, currentProduct, currentIndex } = this.state;
     

    return (
        <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Product Details</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>               
                <tbody>
                    {
                       
                        products.map((p,i) =>  (
                        <tr>
                            <td>{p.id}</td>
                            <td>{p.productid}</td>
                            <td>{p.product_details}</td>
                            <td>{p.quantity}</td>
                            <td>{p.amount}</td>
                            <td>{
                                    <button className="badge badge-danger mr-2"
                                        onClick={
                                            () => this.deleteProduct(p.id)
                                        }> 
                                        Delete
                                    </button>
                                }</td>
                        </tr>                       
                        
                        )
                        )
                    }
                        { products.map((p,i) => 
                            (p.id) ?  this.isProdAvailableInCart = true : this.isProdAvailableInCart = false  
                            ) }
                        
                    
                </tbody>                
            </table>
            <div id='BuyAllButton'>
            {
                

                this.isProdAvailableInCart ? (
                    <span>
                    <button className="badge badge-danger mr-2" onClick={this.buyAllSelected}
                    > 
                    Buy All
                    </button>     
                    <button className="badge badge-danger mr-2" onClick={this.clearCart}
                    > 
                    Clean All
                    </button>
                    </span>
                ) : "Not present"
            }
            </div>
            <div>{
            this.state.isPurchased ?  <PurchaseInvoice id={this.state.responseinvoiceid}></PurchaseInvoice> 
            : 
            <div><span> { this.state.message}</span> <Link to={"/products/"} className="badge badge-warning">
            Shop more </Link> </div>
            } </div>
                
      </div>
    );
  }
}

export default CartList;

class TableRow extends Component
{
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
       }

    deleteProduct(id) {    
        ProductDataService.removeselectedProducts(id)
          .then(response => {
            console.log(response.data);
            CartList.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }

    render()
    {

        return (
            <tr>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.productid}</td>
                <td>{this.props.data.product_details}</td>
                <td>{this.props.data.quantity}</td>
                <td>{this.props.data.amount}</td>
                <td>{
                        //let prodid = this.props.data.id;
                        <button className="badge badge-danger mr-2"
                            onClick={
                                () => this.deleteProduct(this.props.data.id)
                            }> 
                            Delete
                        </button>
                    }</td>
          
            </tr>

        );
    }
}