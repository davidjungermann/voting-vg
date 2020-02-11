import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'mdbreact/dist/css/mdb.css'
import React from "react";

class FileSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundation: '',
            protein: [],
            extra: [],
            dressing: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
            this.props.history.push('/vote-view');
        }
        event.target.classList.add("was-validated");
        event.preventDefault();
    }

    render() {
        return (
            <div onSubmit={this.handleSubmit}>
                <form className="form-div" noValidate>
                    <div className="form-group row">
                        <h4>Formulär med valkoder:</h4>
                        <select required className="form-control" value={this.state.foundation}>
                            <option selected disabled value="">Välj en Excel-fil med valkoder</option>
                        </select>
                        <div className="invalid-feedback">
                            Välj en fil med valkoder.
                        </div>
                    </div>
                    <p></p>

                    <div className="form-group row">
                        <h4>Formulär med röster:</h4>
                        <select required className="form-control" value={this.state.dressing}>
                            <option selected disabled value="">Välj en Excel-fil med röster</option>
                        </select>
                        <div className="invalid-feedback">
                            Välj en fil med röster.
                        </div>
                    </div>
                    <p></p>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        data-target="./FileSelector"
                        style={{  
                            top: "50%", 
                            left:"50%"
                        }}>
                        Räkna röster från formulär
                    </button>
                </form>
            </div >
        );
    }
}

export default FileSelector;
