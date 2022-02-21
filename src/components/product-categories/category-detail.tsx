import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import parse, { Element } from 'html-react-parser';

import httpFetch from '../../shared/http/http-fetch';
import configData from '../../config.json';
import { Category } from '../../shared/interfaces/category-list';

import classes from './category-detail.module.css';

const CategoryDetail = () => {
	const categoryId = useParams().categoryId;
	const [parentCategory, setParentCategory] = useState<Category>();
	const [categoryGroup, setCategoryGroup] = useState<Category[]>([]);

	const { isLoading, isError, data, error } = useQuery<
		{ data: Category[] },
		Error
	>('categories', async () => {
		const data = await httpFetch<{ data: Category[] }>(
			`${configData.BACKEND_URL}/categories/${categoryId}`
		);
		setParentCategory(data?.data.shift());
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
				if (
					domNode instanceof Element &&
					domNode.attribs.class === 'remove'
				) {
					return <></>;
				}
			},
		});

	return (
		<>
			<div className={classes['category-detail__container']}>
				<div className={classes['category-detail']}>
					<h1
						className={`${classes['category-detail__heading']} ${classes['category-detail__title']}`}>
						{parentCategory?.title}
					</h1>
					<div className={classes['category-detail__description']}>
						{parentCategory?.description?.length &&
							parser(parentCategory?.description)}
					</div>
					<div className={classes['category-list']}></div>
				</div>
			</div>
		</>
	);
};

export default CategoryDetail;
