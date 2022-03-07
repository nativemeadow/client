import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import parse, { Element } from 'html-react-parser';

import httpFetch from '../../shared/http/http-fetch';
import { Category } from '../../shared/interfaces/category-list';

import configData from '../../config.json';
import classes from './category-list.module.css';

const CategoryList = () => {
	const [categoryGroup, setCategoryGroup] = useState<Category[]>([]);
	const { isLoading, isError, data, error } = useQuery<
		{ data: Category[] },
		Error
	>('categories', async () => {
		const data = await httpFetch<{ data: Category[] }>(
			`${configData.BACKEND_URL}/categories`
		);
		setCategoryGroup(data?.data);
		return data;
	});

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error}</span>;
	}

	const parser = (input: string) =>
		parse(input, {
			replace: (domNode) => {
				if (domNode instanceof Element) {
					return <></>;
				}
			},
		});

	const gridItem = 'product-gallery__';
	return (
		<div className={classes['product-gallery']}>
			<h2
				className={`${classes['product-gallery__heading']} ${classes['product-gallery__title']}`}>
				Browse Our Product Categories
			</h2>
			<div className={classes['product-gallery__grid']}>
				{categoryGroup.map((item) => {
					return (
						<div
							key={item.id}
							className={classes[`${gridItem}${item.url_key}`]}>
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
										className={`${classes['product-gallery__card']}`}>
										{parser(item.title)}
									</span>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CategoryList;
