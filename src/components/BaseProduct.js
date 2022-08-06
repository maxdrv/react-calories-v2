import React, {Component} from 'react';

class BaseProduct extends Component {

    render() {
        const {id, name, nutrients} = this.props;
        return (
            <tr>
                <td className={'width-10'}>{id}</td>
                <td className={'width-30'}>{name}</td>
                <td className={'width-15'}>{nutrients.kcal}</td>
                <td className={'width-15'}>{nutrients.proteins}</td>
                <td className={'width-15'}>{nutrients.fats}</td>
                <td className={'width-15'}>{nutrients.carbs}</td>
            </tr>
        );
    }
}

export default BaseProduct;