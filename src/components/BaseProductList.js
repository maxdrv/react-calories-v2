import React, {Component} from 'react';
import axios from "axios";

class BaseProductList extends Component {

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
        const {baseProducts, errorMsg} = this.state
        return (
            <div>
                {
                    baseProducts.length ?
                        baseProducts.map(product => <div>{product.name}</div>) :
                        null
                }
                { errorMsg ? <div>{errorMsg}</div> : null}
            </div>
        );
    }
}

export default BaseProductList;