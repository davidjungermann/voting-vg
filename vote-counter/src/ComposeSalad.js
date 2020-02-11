import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'mdbreact/dist/css/mdb.css'
import React from "react";
import Salad from "./Salad";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ComposeSalad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundation: '',
            protein: [],
            extra: [],
            dressing: ''
        };
        this.handleFoundation = this.handleFoundation.bind(this);
        this.handleProtein = this.handleProtein.bind(this);
        this.handleExtra = this.handleExtra.bind(this);
        this.handleDressing = this.handleDressing.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    getInventory() {
        const inventory = this.props.inventory;

        if (!inventory) {
            alert("inventory is undefined in ComposeSalad");
        }
        return inventory;
    }

    handleFoundation(event) {
        this.setState({ foundation: event.target.value });
    }

    handleProtein(event) {
        let proteins = [...this.state.protein]

        if (event.target.checked) {
            proteins.push(event.target.value)
        } else {
            proteins = proteins.filter(name => (name !== event.target.value));
        }
        this.setState({ protein: proteins })
    }

    handleExtra(event) {
        let extras = [...this.state.extra]

        if (event.target.checked) {
            extras.push(event.target.value)
        } else {
            extras = extras.filter(name => (name !== event.target.value));
        }
        this.setState({ extra: extras })
    }

    handleDressing(event) {
        this.setState({ dressing: event.target.value });
    }

    createSalad() {
        let inventory = this.getInventory();
        let salad = new Salad();
        salad.add(this.state.foundation, inventory[this.state.foundation]);
        this.state.protein.forEach(e => salad.add(e, inventory[e]));
        this.state.extra.forEach(e => salad.add(e, inventory[e]));
        salad.add(this.state.dressing, inventory[this.state.dressing]);
        return salad;
    }

    clearState() {
        this.setState({
            foundation: '',
            protein: [],
            extra: [],
            dressing: ''
        })
    }

    handleSubmit(event) {
        if (event.target.checkValidity() === true) {
            this.props.saladSubmit(this.createSalad());
            this.props.history.push('/order-view');
        }
        event.target.classList.add("was-validated");
        event.preventDefault();
    }

    render() {

        const inventory = this.getInventory();

        let foundations = Object.keys(inventory).filter(
            name => inventory[name].foundation
        );

        let proteins = Object.keys(inventory).filter(
            name => inventory[name].protein
        );

        let extras = Object.keys(inventory).filter(
            name => inventory[name].extra
        );

        let dressings = Object.keys(inventory).filter(
            name => inventory[name].dressing
        );

        return (
            <div onSubmit={this.handleSubmit}>
                <form className="form-div" noValidate>
                    <div className="form-group row">
                        <h4>Bas:</h4>
                        <select required className="form-control" value={this.state.foundation} onChange={this.handleFoundation}>
                            <option selected disabled value="">Välj salladsbas</option>
                            {foundations.map(ingredient => <option key={ingredient} value={ingredient}>
                                {ingredient + ' +' + inventory[ingredient].price + 'kr'}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            Välj en bas till din sallad.
                        </div>
                    </div>
                    <p></p>

                    <h4>Protein:</h4>

                    {proteins.map(ingredient => (
                        <div key={ingredient}>
                            <input
                                type="checkbox"
                                name="protein"
                                value={ingredient}
                                checked={this.state.protein.includes(ingredient)}
                                onChange={this.handleProtein}
                            />
                            <Link to={"/ingredient-view/" + ingredient}  >{" " + ingredient + " +" + inventory[ingredient].price + " kr"}</Link>
                        </div>
                    ))}
                    <p></p>

                    <h4>Extraingredienser:</h4>
                    {extras.map(ingredient => (
                        <div key={ingredient}>
                            <input
                                type="checkbox"
                                name="extras"
                                value={ingredient}
                                checked={this.state.extra.includes(ingredient)}
                                onChange={this.handleExtra}
                            />
                            <Link to={"/ingredient-view/" + ingredient}  >{" " + ingredient + " +" + inventory[ingredient].price + " kr"}</Link>
                        </div>
                    ))}
                    <p></p>

                    <div className="form-group row">
                        <h4>Dressing:</h4>
                        <select required className="form-control" value={this.state.dressing} onChange={this.handleDressing}>
                            <option selected disabled value="">Välj salladsdressing</option>
                            {dressings.map(ingredient => <option key={ingredient} value={ingredient}>
                                {ingredient + ' +' + inventory[ingredient].price + 'kr'}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            Välj en dressing till din sallad.
                        </div>
                    </div>
                    <p></p>
                    <button
                        type="submit"
                        className="btn btn-success"
                        data-target="./ComposeSalad">
                        Lägg till sallad och gå till varukorgen
                    </button>
                </form>
            </div>
        );
    }
}

export default ComposeSalad;
