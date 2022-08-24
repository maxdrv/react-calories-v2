import React, {useEffect, useState, Fragment} from 'react';
import axios from "axios";
import BaseProductRowReadOnly from "./BaseProductRowReadOnly";
import BaseProductRowEditable from "./BaseProductRowEditable";
import BaseProductAddForm from "./BaseProductAddForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons"

const BaseProductPage = (props) => {
    const path = "http://localhost:8080/baseProducts"

    const [filter, setFilter] = useState({name: ''})
    const [errorMsg, setErrorMsg] = useState('')
    const [editBaseProductId, setEditBaseProductId] = useState(null)
    const [editFormData, setEditFormData] = useState({})
    const [pageable, setPageable] = useState({page: 0, size: 25})
    const [sortable, setSortable] = useState({})
    const [page, setPage] = useState({
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0,
        content: []
    })

    useEffect(() => {
        const pathParams = []

        if (filter.name) {
            pathParams.push({name: 'name', value: filter.name})
        }
        pathParams.push({name: 'page', value: pageable.page})
        pathParams.push({name: 'size', value: pageable.size})

        if (sortable && sortable.direction != null) {
            pathParams.push({name: 'sort', value: `${sortable.name},${sortable.direction}`})
        }

        const appendPath = pathParams.map(pathParam => `${pathParam.name}=${pathParam.value}`).join('&');

        axios.get(path + '?' + appendPath)
            .then(response => {
                console.log(response)
                setPage(response.data)
            })
            .catch(error => {
                console.log(error)
                setErrorMsg('Error while fetching data')
            })
    }, [filter, pageable, sortable])

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

    const refreshPage = () => {
        window.location.reload();
    }

    // pagination
    const paginationLi = [];

    const onClickPageNumberHandler = (pageNumber) => {
        setPageable({...pageable, page: pageNumber})
    }

    const onClickPrevHandler = () => {
        if (page.number === 0) {
            return
        }
        setPageable({...pageable, page: page.number - 1})
    }

    const onClickNextHandler = () => {
        if (page.number === page.totalPages - 1) {
            return
        }
        setPageable({...pageable, page: page.number + 1})
    }

    paginationLi.push(
        <li key={-1} className="btn prev" onClick={onClickPrevHandler}>
            <span><FontAwesomeIcon icon={faAngleLeft}/> Prev</span>
        </li>
    )

    for (let i = 0; i < page.totalPages; i++) {
        const activeLi = i === page.number ? 'active' : ''
        paginationLi.push(<li key={i} className={`numb ${activeLi}`} onClick={() => onClickPageNumberHandler(i)}><span>{i + 1}</span></li>)
    }

    paginationLi.push(
        <li key={page.totalPages} className="btn next" onClick={onClickNextHandler}>
            <span>Next <FontAwesomeIcon icon={faAngleRight}/></span>
        </li>
    )

    // sorting
    const onClickSortHandler = (event, column) => {
        event.preventDefault()
        if (sortable.name === column) {
            setSortable({name: sortable.name, direction: nextSortOrder(sortable.direction)})
        } else {
            setSortable({name: column, direction: 'asc'})
        }
    }

    const nextSortOrder = (current) => {
        if (current === 'asc') {
            return 'desc'
        }
        if (current === 'desc') {
            return null
        }
        if (current === null) {
            return 'asc'
        }
    }

    const inferStyle = (column) => {
        if (column !== sortable.name) {
            return 'th-sort-neutral'
        }
        if (sortable.direction === 'asc') {
            return 'th-sort-asc'
        }
        if (sortable.direction === 'desc') {
            return 'th-sort-desc'
        }
        return 'th-sort-neutral'
    }

    return (
        <div>
            <BaseProductAddForm path={path}/>
            <div className={'base-product-filter'}>
                <input type='text' name='name' placeholder='name' onChange={handleFilterChange}/>
            </div>
            <form onSubmit={handleSubmitEditForm}>
                <table className={'base-product-table'}>
                    <thead>
                    <tr>
                        <th className={`sortable ${inferStyle('id')}`} onClick={(event) => onClickSortHandler(event, 'id')}>id</th>
                        <th className={`sortable ${inferStyle('name')}`} onClick={(event) => onClickSortHandler(event, 'name')}>name</th>
                        <th>kcal</th>
                        <th>proteins</th>
                        <th>fats</th>
                        <th>carbs</th>
                        <th>actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        page.content.length ?
                            page.content.map(product => {
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

            <div className={'base-product-pagination'}>
                <ul>
                    {
                        paginationLi
                    }
                </ul>
            </div>
        </div>
    )
}

export default BaseProductPage;