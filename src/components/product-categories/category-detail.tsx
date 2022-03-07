import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import parse, { Element } from 'html-react-parser';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

// import httpFetch from '../../shared/http/http-fetch';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import configData from '../../config.json';
import { Category } from '../../shared/interfaces/category-list';
import BreadCrumbs from '../navigation/bread-crumbs';
import Products from './products';

import classes from './category-detail.module.css';

const CategoryDetail = () => {
	const categoryId = useParams().categoryId;
	console.log('Category Id:', categoryId);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [parentCategory, setParentCategory] = useState<Category>();
	const [categoryGroup, setCategoryGroup] = useState<Category[]>([]);

	// const { isLoading, isError, data, error } = useQuery<
	// 	{ data: Category[] },
	// 	Error
	// >('categories', async () => {
	// 	const data = await httpFetch<{ data: Category[] }>(
	// 		`${configData.BACKEND_URL}/categories/${categoryId}`
	// 	);
	// 	setParentCategory(data?.data.shift());
	// 	setCategoryGroup(data?.data);
	// 	return data;
	// });

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const data = await sendRequest<{ data: Category[] }>(
					`${configData.BACKEND_URL}/categories/${categoryId}`
				);
				setParentCategory(data?.data.shift());
				setCategoryGroup(data?.data);
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
			<BreadCrumbs categoryId={categoryId} />
			<div className={classes['category-detail']}>
				{isLoading && (
					<div className='center'>
						<LoadingSpinner asOverlay />
					</div>
				)}
				<ErrorModal error={error} onClear={clearError} />
				<h1
					className={`${classes['category-detail__heading']} ${classes['category-detail__title']}`}>
					{parentCategory?.title}
				</h1>
				<div className={classes['category-detail__description']}>
					{parentCategory?.description?.length &&
						parser(parentCategory?.description)}
				</div>
				<div className={classes['category__list']}></div>

				<div className={classes['category__group']}>
					{categoryGroup?.map((item) => {
						return (
							<div key={item.id}>
								<div className={classes['category__image']}>
									<Link to={`/category/${item.id}`}>
										<img
											src={`${configData.IMAGES}/product-categories/${item.image}`}
											alt={item.title}
										/>
									</Link>
									<h2 className={classes['category-title']}>
										<Link to={`/category/${item.id}`}>
											{item.title}
										</Link>
									</h2>
								</div>
							</div>
						);
					})}

					<Routes>
						<Route
							path={`/category/:categoryId/*`}
							element={<CategoryDetail />}
						/>
					</Routes>
				</div>
				<Products categoryId={parentCategory?.id} />
			</div>
		</>
	);
};

export default CategoryDetail;
