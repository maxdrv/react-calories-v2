import React, {Component} from 'react';

class BaseProduct extends Component {

    render() {
        const {id, name, nutrients} = this.props;
        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{nutrients.kcal}</td>
                <td>{nutrients.proteins}</td>
                <td>{nutrients.fats}</td>
                <td>{nutrients.carbs}</td>
            </tr>
        );
    }
}

export default BaseProduct;