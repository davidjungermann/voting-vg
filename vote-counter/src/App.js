import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'mdbreact/dist/css/mdb.css'
import inventory from './inventory.ES6';
import FileSelector from "./FileSelector";
import OrderView from "./OrderView";
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.saladSubmit = this.saladSubmit.bind(this);
    this.saladRemove = this.saladRemove.bind(this);
    this.state = {
      order: []
    };
  }

  saladSubmit(salad) {
    let tempSalads = [...this.state.order];
    tempSalads.push(salad)
    this.setState({ order: tempSalads })
  }

  saladRemove(salad) {
    let tempSalads = [...this.state.order];
    tempSalads.splice(tempSalads.indexOf(salad), 1);
    this.setState({ order: tempSalads })
  }

  composeSaladElem() {
    return (params) => <FileSelector {...params} inventory={inventory}
      saladSubmit={this.saladSubmit} />;
  }

  composeOrderElem() {
    return (params) => <OrderView {...params} orderList={this.state.order} saladRemove={this.saladRemove} />;
  }

  renderIngredient() {
    let { ingredient } = useParams();

    return (
      <div>
        <h3>Ingredient: {ingredient}</h3>
        <h4>Egenskaper: {JSON.stringify(inventory[ingredient], null, 2)}</h4>
      </div>
    );
  }

  render() {
    const compose = this.composeSaladElem();
    const orders = this.composeOrderElem();

    return (
      <Router>
        <div className="jumbotron text-center" style={{ "marginTop": "-50px" }}>
          <h1 className="display-4">Rösträknare</h1>
          <p className="lead">Västgöta Nation</p>
          <ul className="nav nav-pills" style={{ "marginBottom": "-60px" }}>
            <li>
              <Link className="nav-link" to="/compose-salad">Ladda upp röstningsformulär</Link>
            </li>
          </ul>
        </div>
        <div className="container w-25">
          <Route path="/compose-salad" render={compose}></Route>
        </div>
        <div>
          <Route path="/order-view" render={orders}></Route>
        </div>
        <div>
          <Route path="/ingredient-view/:ingredient" children={<this.renderIngredient />}></Route>
        </div>
      </Router>
    );
  }
}
export default App;
