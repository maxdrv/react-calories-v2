import React, {useEffect, useState, Fragment} from 'react';
import axios from "axios";
import BaseProductRowReadOnly from "./BaseProductRowReadOnly";
import BaseProductRowEditable from "./BaseProductRowEditable";

const BaseProductPage = (props) => {
    const path = "http://localhost:8080/baseProducts"

    const [baseProductList, setBaseProductList] = useState([])
    const [filter, setFilter] = useState({name: ''})
    const [errorMsg, setErrorMsg] = useState('')
    const [editBaseProductId, setEditBaseProductId] = useState(null)
    const [editFormData, setEditFormData] = useState({})
    const [addFormData, setAddFormData] = useState({})

    useEffect(() => {
        const appendPath = filter.name ? `?name=${filter.name}` : ''
        axios.get(path + appendPath)
            .then(response => {
                console.log(response)
                setBaseProductList(response.data.content)
            })
            .catch(error => {
                console.log(error)
                setErrorMsg('Error while fetching data')
            })
    }, [filter])

    const handleFilterChange = (event) => {
        event.preventDefault()

        const fieldName = event.target.name
        const fieldValue = event.target.value

        setFilter({...filter, [fieldName]: fieldValue})
    }

    const handleEditClick = (event, product) => {
        event.preventDefault();
        setEditBaseProductId(product.id);
        setEditFormData({
            id: product.id,
            name: product.name,
            kcal: product.nutrients.kcal,
            proteins: product.nutrients.proteins,
            fats: product.nutrients.fats,
            carbs: product.nutrients.carbs
        })
    }

    const handleCancelClick = (event) => {
        event.preventDefault();
        setEditBaseProductId(null)
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name
        const fieldValue = event.target.value

        setEditFormData({...editFormData, [fieldName]: fieldValue})
    }

    const handleSubmitEditForm = (event) => {
        event.preventDefault();

        const req = {
            name: editFormData.name,
            nutrients: {
                kcal: editFormData.kcal,
                proteins: editFormData.proteins,
                fats: editFormData.fats,
                carbs: editFormData.carbs
            }
        }

        axios.put(`${path}/${editBaseProductId}`, req)
            .then(response => {
                console.log(response)
                refreshPage();  // TODO may be i should use response to update UI without refreshing page
            })
            .catch(error => {
                console.log(error)
            })

        setEditBaseProductId(null)
    }

    const handleDeleteClick = (event, productId) => {
        event.preventDefault();

        axios.delete(`${path}/${productId}`)
            .then(response => {
                console.log(response)
                refreshPage();
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSubmitAddForm = (event) => {
        event.preventDefault();

        const req = {
            name: addFormData.name,
            nutrients: {
                kcal: addFormData.kcal,
                proteins: addFormData.proteins,
                fats: addFormData.fats,
                carbs: addFormData.carbs
            }
        }

        axios.post(path, req)
            .then(response => {
                console.log(response)
                refreshPage();
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name
        const fieldValue = event.target.value

        setAddFormData({...addFormData, [fieldName]: fieldValue})
    }


    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div>
            <div className={'base-product-form-add'}>
                <form onSubmit={handleSubmitAddForm}>
                            <span className={'width-10'}>

                            </span>
                    <span className={'width-30'}>
                                <input type='text' name='name' value={addFormData.name} onChange={handleAddFormChange}/>
                            </span>
                    <span className={'width-10'}>
                                <input type='text' name='kcal' value={addFormData.kcal} onChange={handleAddFormChange}/>
                            </span>
                    <span className={'width-10'}>
                                <input type='text' name='proteins' value={addFormData.proteins} onChange={handleAddFormChange}/>
                            </span>
                    <span className={'width-10'}>
                                <input type='text' name='fats' value={addFormData.fats} onChange={handleAddFormChange}/>
                            </span>
                    <span className={'width-10'}>
                                <input type='text' name='carbs' value={addFormData.carbs} onChange={handleAddFormChange}/>
                            </span>
                    <span className={'width-20'}>
                                <button type='submit'>Add</button>
                            </span>
                </form>
            </div>
            <div className={'base-product-filter'}>
                <input type='text' name='name' placeholder='name' onChange={handleFilterChange}/>
            </div>
            <form onSubmit={handleSubmitEditForm}>
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
                        baseProductList.length ?
                            baseProductList.map(product => {
                                return (
                                    <Fragment key={product.id}>
                                        {
                                            editBaseProductId === product.id ?
                                                <BaseProductRowEditable
                                                    editFormData={editFormData}
                                                    handleEditFormChange={handleEditFormChange}
                                                    handleCancelClick={handleCancelClick}
                                                /> :
                                                <BaseProductRowReadOnly
                                                    product={product}
                                                    handleEditClick={handleEditClick}
                                                    handleDeleteClick={handleDeleteClick}
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
            {errorMsg ? <div>{errorMsg}</div> : null}
        </div>
    )
}

export default BaseProductPage;