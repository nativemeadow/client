import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parse, { Element } from 'html-react-parser';
import BreadCrumbs from '../navigation/bread-crumbs';

import classes from './product-detail.module.css';

const ProductDetail = (props: any) => {
	const categoryId = useParams().categoryId;
	const productId = useParams().productId;

	return (
		<div className={classes['product-detail']}>
			<BreadCrumbs categoryId={categoryId} productId={productId} />
			<div className={classes['category-detail']}>
				<div className={classes['product-detail-container']}>
					<h1>Product Detail</h1>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
