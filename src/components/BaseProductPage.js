import React, {Component, Fragment} from 'react';
import axios from "axios";
import BaseProductRowReadOnly from "./BaseProductRowReadOnly";
import BaseProductRowEditable from "./BaseProductRowEditable";

class BaseProductPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.path = "http://localhost:8080/baseProducts";

        this.state = {
            baseProducts: [],
            errorMsg: null,
            editBaseProductId: null,
            addFormData: {
                name: "",
                kcal: 0,
                proteins: 0,
                fats: 0,
                carbs: 0
            },
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
        axios.get(this.path)
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

    handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name
        const fieldValue = event.target.value

        this.setState(prevState => {
            prevState.addFormData[fieldName] = fieldValue;
            return prevState;
        });
    }

    handleSubmitAddForm = (event) => {
        event.preventDefault();

        const req = {
            name: this.state.addFormData.name,
            nutrients: {
                kcal: this.state.addFormData.kcal,
                proteins: this.state.addFormData.proteins,
                fats: this.state.addFormData.fats,
                carbs: this.state.addFormData.carbs
            }
        }

        axios.post(this.path, req)
            .then(response => {
                console.log(response)
                this.refreshPage();
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name
        const fieldValue = event.target.value

        this.setState(prevState => {
            prevState.editFormData[fieldName] = fieldValue;
            return prevState
        });
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

        axios.put(`${this.path}/${productId}`, req)
            .then(response => {
                console.log(response)
                this.refreshPage();
            })
            .catch(error => {
                console.log(error)
            })

        this.setState(prevState => {
            prevState.editBaseProductId = null;
            return prevState;
        })
    }

    handleDeleteClick = (event, productId) => {
        event.preventDefault();

        axios.delete(`${this.path}/${productId}`)
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
        const {baseProducts, errorMsg, editBaseProductId, addFormData} = this.state;
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmitAddForm}>
                        <input type='text' name='name' value={addFormData.name} onChange={this.handleAddFormChange}/>
                        <input type='text' name='kcal' value={addFormData.kcal} onChange={this.handleAddFormChange}/>
                        <input type='text' name='proteins' value={addFormData.proteins} onChange={this.handleAddFormChange}/>
                        <input type='text' name='fats' value={addFormData.fats} onChange={this.handleAddFormChange}/>
                        <input type='text' name='carbs' value={addFormData.carbs} onChange={this.handleAddFormChange}/>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
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
                                        <Fragment key={product.id}>
                                            {
                                                editBaseProductId === product.id ?
                                                    <BaseProductRowEditable
                                                        editFormData={this.state.editFormData}
                                                        handleEditFormChange={this.handleEditFormChange}
                                                        handleCancelClick={this.handleCancelClick}
                                                    /> :
                                                    <BaseProductRowReadOnly
                                                        product={product}
                                                        handleEditClick={this.handleEditClick}
                                                        handleDeleteClick={this.handleDeleteClick}
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