import React, { Component } from "react";
import {Switch, Route, Link} from "react-router-dom"
import ProductDataService from "../services/product.service";

export default class Invoice extends Component {
  constructor(props) {
    super(props);
    console.log("Insie Invoce");
    console.log(props);

    this.state = {
       invoiceid: props.responseInvoice.invoiceid,
        buyername: props.responseInvoice.buyername,
        date_time: props.responseInvoice.date_time,
        billedAmount: props.responseInvoice.billedAmount,
       // products: [],
       // product2: [],

        message: ""
    };
  }

  state = {
     invoiceid: this.props.responseInvoice.invoiceid,
     buyername: this.props.responseInvoice.buyername,
     date_time: this.props.responseInvoice.date_time,
     billedAmount: this.props.responseInvoice.billedAmount,
     //products: this.props.responseInvoice.products,
     
     message: ""
 };
 

  render() {
    //const { currentInvoice } = this.state;

    return (
      <div>
        {
          this.state.invoiceid ? (
          <div className="edit-form">
            <h4>Invoice</h4>
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="id"
                  value={this.state.invoiceid ? this.state.invoiceid : ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Buyer Name</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="name"
                  value={this.state.buyername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="billedDate">Model</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="billedDate"
                  value={this.state.date_time}
                />
              </div>
              <div className="form-group">
                <label htmlFor="billedAmount">Total Bill</label>
                <input
                  type="text"
                  disabled="true"
                  className="form-control"
                  id="billedAmount"
                  value={this.state.billedAmount}
                />
              </div>

              <div>
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                        {
                           // this.state.product2.map((product, i) => <TableRow indx= {i} data = {product} />)
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
        //console.log(this.props.data);

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
