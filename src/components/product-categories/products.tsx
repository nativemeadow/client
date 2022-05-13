import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Image from '../../shared/components/UIElements/Images';
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import httpFetch from '../../shared/http/http-fetch';
import { parser } from '../../shared/util/html-parse';
import { Product } from '../../shared/interfaces/product';
import configData from '../../config.json';
import { ProductArrayBuilder } from '../../shared/util/product-builder';

import classes from './products.module.css';

const Products = (props: { categoryId: number | undefined }) => {
	const categoryId = props.categoryId;
	const [products, setProducts] = useState<Product[]>();
	categoryId && console.log('Category Id:', categoryId);

	const {
		isLoading,
		isError,
		data: productData,
		error,
	} = useQuery<Product[], Error>(['products', categoryId], async () => {
		try {
			return await httpFetch<Product[]>(
				`${configData.BACKEND_URL}/categories/product-pricing/${categoryId}`
			);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	useEffect(() => {
		productData && setProducts(ProductArrayBuilder(productData));
	}, [productData]);

	return (
		<>
			<div className={classes['products-detail']}>
				{isLoading && (
					<div className='center'>
						<LoadingSpinner asOverlay />
					</div>
				)}
				{/* <ErrorModal error={error} onClear={clearError} /> */}
				{isError && <div className='error'>{error?.message}</div>}
				<div className={classes['products__group']}>
					{products?.map((item) => {
						return (
							<div key={item.id}>
								<div className={classes['products__image']}>
									<Link
										to={`/category/${categoryId}/product/${item.id}`}>
										{item.image ? (
											<Image
												src={[
													`${configData.IMAGES}/products/${item.image}`,
													`${configData.IMAGES}/products/default_image.png`,
												]}
												alt={item.title}
											/>
										) : (
											<img
												src={`${configData.IMAGES}/products/default_image.png`}
												alt={item.title}
											/>
										)}
									</Link>
								</div>
								<h2 className={classes['products-title']}>
									<Link
										to={`/category/${categoryId}/product/${item.id}`}>
										{parser(item.title.toUpperCase())}
									</Link>
								</h2>
								<ul className={classes['products-pricing']}>
									{item.pricing.map((price) => {
										return (
											<li
												key={price.key}
												id={`price-${price.key}`}>
												<span
													className={
														classes[
															'products-pricing-usd'
														]
													}>
													{price.price.toFixed(2)}
												</span>
												&nbsp; / &nbsp;{' '}
												{parser(price.units)}
											</li>
										);
									})}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Products;
