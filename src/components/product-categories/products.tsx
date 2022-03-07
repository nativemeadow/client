import React, { useState, useEffect } from 'react';
import parse, { Element } from 'html-react-parser';
import { Link } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import { Product, Pricing } from '../../shared/interfaces/product';
import configData from '../../config.json';

import classes from './products.module.css';

function ProductConstructor(prodData: Product[]) {
	const currentProducts: Product[] = [];
	prodData.forEach((prod: Product) => {
		const currentProduct: Product = {
			id: prod.id,
			sku: prod.sku,
			title: prod.title,
			description: prod.description,
			image: prod.image,
			pricing: prod.pricing,
		};
		currentProducts.push(currentProduct);
	});
	return currentProducts;
}

const Products = (props: { categoryId: number | undefined }) => {
	const categoryId = props.categoryId;
	const [products, setProducts] = useState<Product[]>();
	console.log('Category Id:', categoryId);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const data = await sendRequest<Product[]>(
					`${configData.BACKEND_URL}/categories/product-pricing/${categoryId}`
				);
				const currentProducts = ProductConstructor(data);
				console.log('product', currentProducts);
				setProducts(currentProducts);
			} catch (err) {
				console.error(err);
			}
		};

		fetchCategory();
	}, [categoryId, sendRequest]);

	const parser = (input: string) =>
		parse(input, {
			replace: (domNode) => {
				if (domNode instanceof Element) {
					return <></>;
				}
			},
		});

	return (
		<>
			<div className={classes['products-detail']}>
				{isLoading && (
					<div className='center'>
						<LoadingSpinner asOverlay />
					</div>
				)}
				<ErrorModal error={error} onClear={clearError} />
				<div className={classes['products__group']}>
					{products?.map((item) => {
						return (
							<div>
								<div className={classes['products__image']}>
									<Link to={`/category/${item.id}`}>
										<img
											src={`${configData.IMAGES}/products/${item.image}`}
											alt={item.title}
										/>
									</Link>
								</div>
								<h2 className={classes['products-title']}>
									<Link to={`/category/${item.id}`}>
										{parser(item.title.toUpperCase())}
									</Link>
								</h2>
								<ul className={classes['products-pricing']}>
									{item.pricing.map((price) => {
										return (
											<li>
												{parser(price.description)}:
												&nbsp;{' '}
												<span
													className={
														classes[
															'products-pricing-usd'
														]
													}>
													{price.price}
												</span>
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
