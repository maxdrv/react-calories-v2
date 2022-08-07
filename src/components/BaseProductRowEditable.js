import React, {Component} from 'react';

class BaseProductRowEditable extends Component {
    render() {
        const {editFormData, handleEditFormChange, handleCancelClick} = this.props;
        return (
            <tr>
                <td className={'width-10'}>
                    {editFormData.id}
                </td>
                <td className={'width-30'}>
                    <input type='text' required='required' name='name' value={editFormData.name} onChange={handleEditFormChange}/>
                </td>
                <td className={'width-10'}>
                    <input type='text' required='required' name='kcal' value={editFormData.kcal} onChange={handleEditFormChange}/>
                </td>
                <td className={'width-10'}>
                    <input type='text' required='required' name='proteins' value={editFormData.proteins} onChange={handleEditFormChange}/>
                </td>
                <td className={'width-10'}>
                    <input type='text' required='required' name='fats' value={editFormData.fats} onChange={handleEditFormChange}/>
                </td>
                <td className={'width-10'}>
                    <input type='text' required='required' name='carbs' value={editFormData.carbs} onChange={handleEditFormChange}/>
                </td>
                <td className={'width-20'}>
                    <button type='submit'>Save</button>
                    <button type='button' onClick={handleCancelClick}>Cancel</button>
                </td>
            </tr>
        );
    }
}

export default BaseProductRowEditable;