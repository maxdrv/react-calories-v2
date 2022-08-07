import React, {Component} from 'react';

class BaseProductRowReadOnly extends Component {

    render() {
        const {product, handleEditClick} = this.props;
        return (
            <tr>
                <td className={'width-10'}>{product.id}</td>
                <td className={'width-30'}>{product.name}</td>
                <td className={'width-10'}>{product.nutrients.kcal}</td>
                <td className={'width-10'}>{product.nutrients.proteins}</td>
                <td className={'width-10'}>{product.nutrients.fats}</td>
                <td className={'width-10'}>{product.nutrients.carbs}</td>
                <td className={'width-20'}>
                    <button type='button' onClick={(event) => handleEditClick(event, product)}>Edit</button>
                </td>
            </tr>
        );
    }
}

export default BaseProductRowReadOnly;