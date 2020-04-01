import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";

class VoteView extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick = event => {
        this.props.history.push('/file-selector');
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div class="row">
                    <div class="col text-center">
                        <button type="button" className="btn btn-success m-4 btn-lg" onClick={this.onClick}>Gör en ny röstning</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default VoteView;