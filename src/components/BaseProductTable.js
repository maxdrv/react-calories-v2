import React, {Component} from 'react';
import BaseProductRowReadOnly from "./BaseProductRowReadOnly";

class BaseProductTable extends Component {

    render() {
        const {baseProducts} = this.props;
        return (
            <div>
                <table className={'base-product-table'}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>kcal</th>
                            <th>proteins</th>
                            <th>fats</th>
                            <th>carbs</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        baseProducts.length ?
                            baseProducts.map(product => <BaseProductRowReadOnly key={product.id} id={product.id} name={product.name} nutrients={product.nutrients} />) :
                            null
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BaseProductTable;