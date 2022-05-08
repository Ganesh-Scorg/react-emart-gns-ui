import React, { Component } from "react";
import {Switch, Route, Link} from "react-router-dom"
import ProductDataService from "../services/product.service";

export default class PurchaseInvoice extends Component {
  constructor(props) {
    super(props);
    console.log("Insie Invoce");
    console.log(props);

    this.state = {
        currentInvoice: {
            invoiceid: "",
            buyername: "",
            date_time: null,
            billedAmount: 0,
            products: [],
        },
        message: ""
    };
  }

  componentDidMount() {
    this.getInvoice(this.props.id);
  }

  getInvoice(id) {
    ProductDataService.getPurchaseInvoice(id)
      .then(response => {
        this.setState({
          currentInvoice: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        this.getInvoice(this.props.match.params.id);
      });
  };
 

  render() {
    const { currentInvoice } = this.state;

    return (
      <div>
        {
          currentInvoice ? (
          <div className="edit-form">
            <h4>Invoice</h4>
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="id"
                  value={currentInvoice.invoiceid ? currentInvoice.invoiceid : ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Buyer Name</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="name"
                  value={currentInvoice.buyername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="billedDate">Billed Date & Time</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="billedDate"
                  value={currentInvoice.date_time}
                />
              </div>
              <div className="form-group">
                <label htmlFor="billedAmount">Total Bill</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="billedAmount"
                  value={currentInvoice.billedAmount}
                />
              </div>

              <div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Product ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Model</th>
                        <th scope="col">Price</th>
                        </tr>
                    </thead>  
                    <tbody>
                        {
                            currentInvoice.products.map((product, i) => <TableRow indx= {i+1} data = {product} />)
                        }
                    </tbody>
                </table>
             </div>   
            <Link
                to={"/products/"}
                className="badge badge-warning"
            >
                Ok
            </Link>
          </div>
            ) :
            (
                <div>Nothing to show</div>
            )
       }
      </div>
    );
  }
}

class TableRow extends Component
{
    render()
    {
        return (
            <tr>
                <td>{this.props.indx}</td>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.model}</td>
                <td>{this.props.data.price}</td>              
            </tr>

        );
    }
}
