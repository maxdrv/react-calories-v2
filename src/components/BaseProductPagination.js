import React from 'react';

const BaseProductPagination = ({page, pageable, setPageable}) => {

    const total = page.totalElements === 1 ? '1 base product founded' : `${page.totalElements} base products founded`

    return (
        <div>
            <div className={'base-product-pagination'}>
                <span>{total}</span>
            </div>
        </div>
    );
}

export default BaseProductPagination;