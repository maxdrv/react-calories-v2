import React, {Component, Fragment} from 'react';
import CreateBaseProductForm from "./CreateBaseProductForm";
import axios from "axios";
import BaseProductRowReadOnly from "./BaseProductRowReadOnly";
import BaseProductRowEditable from "./BaseProductRowEditable";

class BaseProductPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            baseProducts: [],
            errorMsg: null,
            editBaseProductId: null
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

    handleEditClick = (event, baseProductId) => {
        event.preventDefault();

        this.setState(prevState => {
            prevState['editBaseProductId'] = baseProductId;
            return prevState;
        })
    }

    handleCancelClick = (event) => {
        this.setState(prevState => {
            prevState['editBaseProductId'] = null;
            return prevState;
        })
    }

    render() {
        const {baseProducts, errorMsg, editBaseProductId} = this.state;
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
                        <th>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        baseProducts.length ?
                            baseProducts.map(product => {
                                return (
                                    <Fragment>
                                        {
                                            editBaseProductId === product.id ?
                                                <BaseProductRowEditable handleCancelClick={this.handleCancelClick}/> :
                                                <BaseProductRowReadOnly
                                                    key={product.id}
                                                    id={product.id}
                                                    name={product.name}
                                                    nutrients={product.nutrients}
                                                    handleEditClick={this.handleEditClick}
                                                />
                                        }
                                    </Fragment>
                                )
                            }) :
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