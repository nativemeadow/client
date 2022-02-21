import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import httpFetch from '../../shared/http/http-fetch';
import { Category } from '../../shared/interfaces/category-list';

import configData from '../../config.json';
import classes from './category-list.module.css';

const CategoryList = () => {
	const { isLoading, isError, data, error } = useQuery<
		{ data: Category[] },
		Error
	>('categories', async () => {
		const data = await httpFetch<{ data: Category[] }>(
			`${configData.BACKEND_URL}/categories`
		);
		return data;
	});

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error}</span>;
	}

	const gridItem = 'product-gallery__';
	return (
		<div className={classes['product-gallery__container']}>
			<div className={classes['product-gallery']}>
				<h2
					className={`${classes['product-gallery__heading']} ${classes['product-gallery__title']}`}>
					Browse Our Product Categories
				</h2>
				<div className={classes['product-gallery__grid']}>
					{data?.data.map((item) => {
						return (
							<div
								key={item.id}
								className={
									classes[`${gridItem}${item.url_key}`]
								}>
								<Link
									className={classes['product-gallery__link']}
									to={`/category/${item.id}`}>
									<div
										className={
											classes['product-gallery__item']
										}>
										<img
											src={`${configData.IMAGES}/product-categories/${item.image}`}
											alt={item.title}
										/>
										<span
											className={
												classes['product-gallery__card']
											}>
											{item.title}
										</span>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CategoryList;
