import React from 'react';
import './App.css';
import inventory from './inventory.ES6';
import ComposeSalad from "./ComposeSalad";
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
    return (params) => <ComposeSalad {...params} inventory={inventory}
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
          <h1 className="display-4">🌱 PLANTS 🌱</h1>
          <p className="lead">Lunds äckligaste sallad</p>
          <ul className="nav nav-pills" style={{ "marginBottom": "-60px" }}>
            <li>
              <Link className="nav-link" to="/compose-salad" style={{ "color": "green" }}>Komponera din sallad</Link>
            </li>
            <li>
              <Link className="nav-link" to="/order-view" style={{ "color": "green" }}>Beställning</Link>
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
