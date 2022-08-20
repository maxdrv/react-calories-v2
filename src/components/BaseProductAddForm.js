import React, {useState} from 'react';
import axios from "axios";

const BaseProductAddForm = ({path}) => {

    const [addFormData, setAddFormData] = useState({})

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.name
        const fieldValue = event.target.value

        setAddFormData({...addFormData, [fieldName]: fieldValue})
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
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
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
    )
}

export default BaseProductAddForm;