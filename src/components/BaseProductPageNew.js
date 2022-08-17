import React, {useEffect, useState, Fragment} from 'react';
import axios from "axios";
import BaseProductRowReadOnly from "./BaseProductRowReadOnly";

const BaseProductPageNew = (props) => {
    const path = "http://localhost:8080/baseProducts"

    const [baseProductList, setBaseProductList] = useState([])
    const [filter, setFilter] = useState({name: ''})
    const [errorMsg, setErrorMsg] = useState('')

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

    const handleSubmitEditForm = (event) => {
        event.preventDefault();
        console.log('submit edit clicked')
    }

    const handleEditClick = (event, product) => {
        event.preventDefault();
        console.log('edit clicked')
    }

    const handleDeleteClick = (event, product) => {
        event.preventDefault();
        console.log('delete clicked')
    }

    return (
        <div>
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

export default BaseProductPageNew;