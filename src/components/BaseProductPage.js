import React, {Component} from 'react';
import CreateBaseProductForm from "./CreateBaseProductForm";
import axios from "axios";
import BaseProductRowReadOnly from "./BaseProductRowReadOnly";

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
                <table className={'base-product-table'}>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>kcal</th>
                        <th>proteins</th>
                        <th>fats</th>
                        <th>carbs</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        baseProducts.length ?
                            baseProducts.map(product => <BaseProductRowReadOnly key={product.id} id={product.id} name={product.name} nutrients={product.nutrients} />) :
                            null
                    }
                    </tbody>
                </table>
                { errorMsg ? <div>{errorMsg}</div> : null}
            </div>
        );
    }
}

export default BaseProductPage;