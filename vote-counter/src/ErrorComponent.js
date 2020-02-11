import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";

class ErrorComponent extends React.Component {

    render() {
        return (
            <h1 style={{color: "red"}}>404 Error - This resource does not exist.</h1>
        );
    }
}

export default ErrorComponent;