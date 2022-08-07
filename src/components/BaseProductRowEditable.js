import React, {Component} from 'react';

class BaseProductRowEditable extends Component {
    render() {
        return (
            <tr>
                <td className={'width-10'}>
                    <input type='text' required='required' name='id'/>
                </td>
                <td className={'width-30'}>
                    <input type='text' required='required' name='name'/>
                </td>
                <td className={'width-10'}>
                    <input type='text' required='required' name='kcal'/>
                </td>
                <td className={'width-10'}>
                    <input type='text' required='required' name='proteins'/>
                </td>
                <td className={'width-10'}>
                    <input type='text' required='required' name='fats'/>
                </td>
                <td className={'width-10'}>
                    <input type='text' required='required' name='carbs'/>
                </td>
                <td className={'width-20'}>

                </td>
            </tr>
        );
    }
}

export default BaseProductRowEditable;