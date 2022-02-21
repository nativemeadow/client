import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import BreadCrumbs from '../navigation/bread-crumbs';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { Product } from '../../shared/interfaces/product';
import { parser } from '../../shared/util/html-parse';
import parse from 'html-react-parser';
import ProductBuilder from '../../shared/util/product-builder';
import configData from '../../config.json';
import ProductCalculator from './product-calculator';
import httpFetch from '../../shared/http/http-fetch';
import Image from '../../shared/components/UIElements/Images';
import { Orders } from '../cart/orders';

import classes from './product-detail.module.css';
import './product-detail.css';

const productLabelMessage = 'Please Select Product Options';

const ProductDetail = (props: any) => {
	const categoryId = useParams().categoryId;
	const productId = useParams().productId;
	const [products, setProducts] = useState<Product>();
	const [productSize, setProductSize] = useState('');
	const [productOptions, setProductOptions] = useState(productLabelMessage);
	const [selectDetails, setSelectDetails] = useState(<></>);
	const [convergeValue, setCoverageValue] = useState(0);
	const [showCalculator, setShowCalculator] = useState(false);
	const [showAddToCart, setShowAddToCart] = useState(false);
	const [productQty, setProductQty] = useState<number>(1);
	const selectedPrice = useRef(0);
	let navigate = useNavigate();

	const {
		isLoading,
		isError,
		data: productData,
		error,
	} = useQuery<Product, Error>(['product', productId], async () => {
		try {
			return await httpFetch<Product>(
				`${configData.BACKEND_URL}/products/${productId}`
			);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	useEffect(() => {
		let currentProduct;
		if (productData) {
			currentProduct = ProductBuilder(productData);
			setProducts(currentProduct);
			currentProduct.pricing.forEach((price) => {
				setCoverageValue(price.coverage_value);
			});
		}
	}, [productData]);

	const productUnit = (units: string) => {
		let priceTitle = productLabelMessage;
		setProductSize(units);

		products?.pricing.forEach((price) => {
			if (price.units === units) {
				selectedPrice.current = price.price;
				return (priceTitle =
					price.title +
					`<span className=${classes['products-detail-pricing-usd-selected']}>$` +
					price.price.toFixed(2) +
					'</span>');
			}
		});
		return priceTitle;
	};

	const calculator = () => {
		return (
			<div className={classes['product-detail__calculator--button']}>
				<img
					src='/images/assets/calc-icon-sm.png'
					alt='calculator button'
					onClick={openCalculatorHandler}
				/>
				<div
					className={
						classes['product-detail__calculator--button__label']
					}>
					<span onClick={openCalculatorHandler}>Calculator</span>
				</div>
			</div>
		);
	};

	useEffect(() => {
		console.log('Converge', convergeValue);
	}, [convergeValue]);

	useEffect(() => {
		let selection = <></>;

		if (productSize === 'sk') {
			selection = (
				<div
					className={classes['product-quantity__selection--message']}>
					<p>
						Currently this product is not available for purchase
						online in the selected quantity. Please select a
						different option or visit our store to purchase this
						quantity.
					</p>
				</div>
			);
		} else {
			selection = (
				<>
					<div className={classes['product-quantity__selection']}>
						<input
							className={classes['quantity_entry']}
							type='number'
							min='1'
							step='any'
							name='cart_qty'
							value={productQty}
							onChange={(event) =>
								setProductQty(parseInt(event.target.value, 10))
							}
							disabled={productSize.length === 0}
						/>
						<div
							className={
								classes['product-quantity__selection--units']
							}>
							{productSize && '/'} {productSize}
						</div>
						<div
							className={
								classes['product-quantity__selection--button']
							}>
							<button
								type='submit'
								disabled={productSize.length === 0}>
								Add to Cart
							</button>
						</div>
					</div>
				</>
			);
		}
		setSelectDetails(selection);
	}, [productSize, productQty]);

	const addToCartHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let productJson: Orders;
		productJson = {
			id: products?.id,
			sku: products?.sku,
			title: products?.title,
			image: products?.image,
			price: selectedPrice.current,
			qty: productQty,
			unit: productSize,
		};
		let orders: Orders[];

		if (localStorage.getItem('order')) {
			orders = JSON.parse(localStorage.getItem('order')!) as Orders[];

			const existingOrder = orders.find(
				(product) =>
					product.sku === productJson.sku &&
					product.unit === productJson.unit
			);

			if (existingOrder) {
				existingOrder.qty = existingOrder.qty + productJson.qty;
			} else {
				orders = [productJson, ...orders];
			}
		} else {
			orders = [];
			orders.push(productJson);
		}

		localStorage.setItem('order', JSON.stringify(orders));
		openAddToCartHandler();
		console.log('add to cart', productJson);
	};

	const productSelectHandler = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selected = event.target.value;
		const title = productUnit(selected);
		setProductOptions(title);
	};

	const openCalculatorHandler = () => {
		setShowCalculator(true);
	};

	const closeCalculatorHandler = () => {
		setShowCalculator(false);
	};

	const closeAddToCartHandler = () => {
		setShowAddToCart(false);
	};

	const viewShoppingCartHandler = () => {
		setShowAddToCart(false);
		navigate('/shopping-cart');
	};

	const openAddToCartHandler = () => {
		setShowAddToCart(true);
	};

	return (
		<>
			{products && (
				<BreadCrumbs categoryId={categoryId} productId={productId} />
			)}
			<Modal
				show={showCalculator}
				onCancel={closeCalculatorHandler}
				header={'Calculator'}
				className='calculator__modal'
				headerClass='item__modal-header'
				contentClass='calculator-item__modal-content'
				footerClass='calculator-item__modal-actions'
				footer={
					<Button onClick={closeCalculatorHandler}>Close</Button>
				}>
				<div className={classes['calculator-container']}>
					<ProductCalculator />
				</div>
			</Modal>
			<Modal
				show={showAddToCart}
				onCancel={closeAddToCartHandler}
				header={'Add to Cart'}
				headerClass='item__modal-header'
				contentClass='addToCart-item__modal-content'
				footerClass='addToCart-item__modal-actions'
				footer={
					<>
						<Button onClick={viewShoppingCartHandler}>
							View Cart
						</Button>
						<Button onClick={closeAddToCartHandler}>
							Continue Shopping
						</Button>
					</>
				}>
				<div className={classes['addToCart-dialog']}>
					<h2>Add to Cart</h2>
					<p>1 Item(s) Consolidated into cart.</p>
				</div>
			</Modal>
			<div className={classes['product-detail_wrapper']}>
				{isLoading && (
					<div className='center'>
						<LoadingSpinner asOverlay />
					</div>
				)}
				{/* <ErrorModal error={error} onClear={clearError} /> */}
				{isError && <div className='error'>{error?.message}</div>}
				<div className={classes['product-detail-container']}>
					<div className={classes['product-detail__image']}>
						{products?.image ? (
							<Image
								src={[
									`${configData.IMAGES}/products/${products?.image}`,
									`${configData.IMAGES}/products/default_image.png`,
								]}
								alt={
									products?.title !== undefined
										? products?.title
										: ''
								}
							/>
						) : (
							<img
								src={`${configData.IMAGES}/products/default_image.png`}
								alt={products?.title}
							/>
						)}
					</div>
					<div className={classes['product-detail']}>
						<h1>
							{products?.title !== undefined
								? parser(products?.title)
								: ''}
						</h1>
						<ul className={classes['products-detail-pricing']}>
							{products?.pricing.map((price, key) => {
								return (
									<li key={key} id={`price-${price.key}`}>
										<span
											className={
												classes[
													'products-detail-pricing-usd'
												]
											}>
											${price.price.toFixed(2)}
										</span>
										&nbsp;/
										{parser(price.units)}
									</li>
								);
							})}
						</ul>
						<form name='addToCart' onSubmit={addToCartHandler}>
							<div
								className={
									classes['product-detail__selection']
								}>
								<p
									className={
										classes[
											'product-detail__select--options'
										]
									}>
									{parse(productOptions)}
								</p>
								<select
									name='product_select'
									onChange={productSelectHandler}
									className={
										classes[
											'products-detail-pricing__select'
										]
									}>
									<option value=''>Select size</option>
									{products?.pricing.map((price, key) => {
										return (
											<option
												key={key}
												value={price.units}>
												{price.description}
											</option>
										);
									})}
								</select>
							</div>

							{selectDetails}
						</form>
						{convergeValue && calculator()}
						<div className={classes['product-detail__description']}>
							{products?.description !== undefined
								? parse(products?.description)
								: ''}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetail;
