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
            editBaseProductId: null,
            editFormData: {
                id: -1,
                name: "",
                kcal: 0,
                proteins: 0,
                fats: 0,
                carbs: 0
            }
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

    handleEditClick = (event, product) => {
        event.preventDefault();

        this.setState(prevState => {
            prevState['editBaseProductId'] = product.id;

            prevState['editFormData'] = {
                id: product.id,
                name: product.name,
                kcal: product.nutrients.kcal,
                proteins: product.nutrients.proteins,
                fats: product.nutrients.fats,
                carbs: product.nutrients.carbs
            }

            return prevState;
        })
    }

    handleCancelClick = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            prevState['editBaseProductId'] = null;
            return prevState;
        })
    }

    handleSubmitEditForm = (event) => {
        event.preventDefault();

        const productId = this.state.editBaseProductId;

        const req = {
            name: this.state.editFormData.name,
            nutrients: {
                kcal: this.state.editFormData.kcal,
                proteins: this.state.editFormData.proteins,
                fats: this.state.editFormData.fats,
                carbs: this.state.editFormData.carbs
            }
        }

        axios.put(`http://localhost:8080/baseProducts/${productId}`, req)
            .then(response => {
                console.log(response)
                this.refreshPage();
            })
            .catch(error => {
                console.log(error)
            })
    }

    refreshPage = () => {
        window.location.reload();
    }

    render() {
        const {baseProducts, errorMsg, editBaseProductId} = this.state;
        return (
            <div>
                <CreateBaseProductForm/>
                <form onSubmit={this.handleSubmitEditForm}>
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
                                                    <BaseProductRowEditable
                                                        editFormData={this.state.editFormData}
                                                        handleCancelClick={this.handleCancelClick}
                                                    /> :
                                                    <BaseProductRowReadOnly
                                                        key={product.id}
                                                        product={product}
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
                </form>
                { errorMsg ? <div>{errorMsg}</div> : null}
            </div>
        );
    }
}

export default BaseProductPage;