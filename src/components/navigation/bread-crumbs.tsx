import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse, { Element } from 'html-react-parser';

import { useHttpClient } from '../../shared/hooks/http-hooks';
import configData from '../../config.json';
import { BreadCrumbItem } from './breadcrumb-item';

import classes from './bread-crumbs.module.css';

type CategoryProps = { categoryId: string | undefined };

const BreadCrumbs: React.FC<CategoryProps> = ({ categoryId }) => {
	const { error, sendRequest } = useHttpClient();
	const [BreadCrumbItem, setBreadCrumbItem] = useState<BreadCrumbItem[]>();

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const data = await sendRequest<BreadCrumbItem[]>(
					`${configData.BACKEND_URL}/categories/hierarchy/${categoryId}`
				);
				setBreadCrumbItem(data);
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

	if (error) {
		return <div id={classes['bread-crumbs-wrapper']}>{error}</div>;
	}

	return (
		<div id={classes['bread-crumbs-wrapper']}>
			<div className={classes['bread-crumbs']}>
				<ul className={classes['bread-crumb']}>
					<li>
						<Link to='/'>Products</Link>
					</li>
					{BreadCrumbItem?.map((item) => {
						return (
							<li id={item.id}>
								<Link to={`/category/${item.id}`}>
									{parser(item.title)}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default BreadCrumbs;
