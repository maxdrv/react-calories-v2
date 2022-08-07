import React, {Component} from 'react';

class BaseProductRowReadOnly extends Component {

    render() {
        const {id, name, nutrients, handleEditClick} = this.props;
        return (
            <tr>
                <td className={'width-10'}>{id}</td>
                <td className={'width-30'}>{name}</td>
                <td className={'width-10'}>{nutrients.kcal}</td>
                <td className={'width-10'}>{nutrients.proteins}</td>
                <td className={'width-10'}>{nutrients.fats}</td>
                <td className={'width-10'}>{nutrients.carbs}</td>
                <td className={'width-20'}>
                    <button type='button' onClick={(event) => handleEditClick(event, id)}>Edit</button>
                </td>
            </tr>
        );
    }
}

export default BaseProductRowReadOnly;