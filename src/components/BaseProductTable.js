import React, {Component} from 'react';
import BaseProduct from "./BaseProduct";

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
                            baseProducts.map(product => <BaseProduct key={product.id} id={product.id} name={product.name} nutrients={product.nutrients} />) :
                            null
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BaseProductTable;