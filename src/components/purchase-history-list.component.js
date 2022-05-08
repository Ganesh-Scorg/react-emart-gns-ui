import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import PurchaseInvoice from "./purchase-invoice.component"
import { Switch, Route, Link } from "react-router-dom";

class PurchaseHistoryList extends Component {
  constructor(props) {
    super(props);
    this.getPurchaseHistory = this.getPurchaseHistory.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      invoices: [],      
      currentInvoice: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.getPurchaseHistory();
  }


  getPurchaseHistory() {
    ProductDataService.getPurchaseHistory()
      .then(response => {
        this.setState({
            invoices: response.data
        });

      })
      .catch(e => {
        console.log(e);
        this.setState({
            invoices: []
          });
      });
  }

  refreshList() {
    this.getPurchaseHistory();
    this.setState({        
        currentInvoice: null,
        currentIndex: -1,
    });
    
  }

  setActiveInvoice = (invoice, index) => {
    this.setState({
      currentInvoice: invoice,
      currentIndex: index
    });
  }

 
 
  render() {
    const { invoices} = this.state;
     

    return (
        <div className="list row" >
            <div className="col-md-6">
            <table class="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">INVOICE ID</th>
                    <th scope="col">DATE & TIME</th>
                    <th scope="col">BILLED AMOUNT</th>
                    <th scope="col">View</th>
                    <th scope="col">Open</th>
                    </tr>
                </thead>               
                <tbody>
                    {
                        invoices ? (
                            invoices.map((inv,i) =>  (
                                <tr>
                                    <td>{inv.invoiceid}</td>
                                    <td>{inv.date_time}</td>
                                    <td>{inv.billedAmount}</td>
                                    <td>{
                                            <button className="badge badge-danger mr-2"
                                                onClick={
                                                    () => this.setActiveInvoice(inv,i)
                                                }> 
                                                View
                                            </button>
                                          
                                        }</td>
                                    <td>
                                            <Link to={"/invoice/" + inv.invoiceid} target="_blank" rel="noopener noreferrer" className="badge badge-warning" >
                                            Open
                                            </Link>
                                    </td>    
                                </tr>                       
                        
                                )
                             )   
                        ) : ""
                    }

                </tbody>                
            </table>
            </div>
            <div className="col-md-6" >
            {
                this.state.currentInvoice ? (
                    <PurchaseInvoice id={this.state.currentInvoice.invoiceid}></PurchaseInvoice>
                ) : "Not present"
            }
            </div>
      </div>

    );
  }
}

export default PurchaseHistoryList;

