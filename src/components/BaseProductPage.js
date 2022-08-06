import React, {Component} from 'react';
import CreateBaseProductForm from "./CreateBaseProductForm";
import BaseProductTable from "./BaseProductTable";
import axios from "axios";

class BaseProductPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            baseProducts: [],
            errorMsg: null
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/baseProducts")
            .then(response => {
                this.setState({
                    baseProducts: response.data.content
                })
            })
            .catch(error => {
                this.setState({
                    errorMsg: 'Error while fetching data'
                })
            })
    }

    render() {
        const {baseProducts, errorMsg} = this.state;
        return (
            <div>
                <CreateBaseProductForm/>
                <BaseProductTable baseProducts={baseProducts}/>
                { errorMsg ? <div>{errorMsg}</div> : null}
            </div>
        );
    }
}

export default BaseProductPage;