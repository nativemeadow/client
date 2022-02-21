import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
//import Select from 'react-select';

import BreadCrumbs from '../navigation/bread-crumbs';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
//import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { Product, Pricing } from '../../shared/interfaces/product';
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
type selectListOptions = {
	units: string;
	description: string;
	image: string;
};
const ProductDetail = (props: any) => {
	const categoryId = useParams().categoryId;
	const productId = useParams().productId;
	const [products, setProducts] = useState<Product>();
	const [productSize, setProductSize] = useState('');
	const [productOptions, setProductOptions] = useState(productLabelMessage);
	const [selectList, setSelectList] = useState<selectListOptions[]>([]);
	const [selectedValue, setSelectedValue] = useState(String);
	const [selectDetails, setSelectDetails] = useState(<></>);
	const [convergeValue, setCoverageValue] = useState(0);
	const [showCalculator, setShowCalculator] = useState(false);
	const [showAddToCart, setShowAddToCart] = useState(false);
	const [productQty, setProductQty] = useState<number>(1);
	const [productImage, setProductImage] = useState('');
	const [productThumbs, setProductThumbs] = useState<Pricing[] | undefined>(
		[]
	);
	const [selectedThumb, setSelectedThumb] = useState<string>();

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
				`${configData.BACKEND_URL}/products/${categoryId}/${productId}`
			);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	useEffect(() => {
		let currentProduct;
		let pricing: Pricing[];
		if (productData) {
			currentProduct = ProductBuilder(productData);
			pricing = currentProduct.pricing;

			setProducts(currentProduct);
			setProductImage(currentProduct.image);
			pricing.forEach((price) => {
				setCoverageValue(price.coverage_value);
			});
			// only one unit price
			currentProduct?.pricing.length! === 1 &&
				setProductSize(pricing[0].units);

			const productOptions = currentProduct?.pricing.map((item) => {
				return {
					units: item.units,
					description: item.description,
					image: item.image,
				};
			});
			setSelectList(productOptions);
			// get thumbnail images if any
			const thumbs = currentProduct?.pricing.filter((price) => {
				return price.image && price.image.length > 0;
			});
			setProductThumbs(thumbs);
		}
	}, [productData]);

	const productUnit = (units: string) => {
		let priceTitle = productLabelMessage;
		setProductSize(units);

		products?.pricing.forEach((price) => {
			if (price.description + price.units === units) {
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

	const filterPricing = () => {
		const filterPrices = products?.pricing.filter((value, index, array) => {
			return index === array.findIndex((t) => t.price === value.price);
		});

		return filterPrices?.map((price, key) => {
			return (
				<li key={key} id={`price-${price.key}`}>
					<span className={classes['products-detail-pricing-usd']}>
						${price.price.toFixed(2)}
					</span>
					&nbsp;/
					{parser(price.units)}
				</li>
			);
		});
	};

	useEffect(() => {
		console.log('Converge', convergeValue);
	}, [convergeValue]);

	useEffect(() => {
		let selection = <></>;

		if (productSize.indexOf('sk') > -1) {
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
							{productSize}
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

	const imageHandler = () => {
		return (
			<Image
				src={[
					`${configData.IMAGES}/products/${productImage}`,
					`${configData.IMAGES}/products/${productImage}`,
				]}
				alt={products?.title !== undefined ? products?.title : ''}
			/>
		);
	};

	const productSelectHandler = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selected = event.target.value;
		setSelectedValue(selected);
		const title = productUnit(selected);
		setProductOptions(title);
		// if there are thumbs highlight the thumb selected for in
		// drop down select list.
		if (productThumbs) {
			selectList.forEach((item) => {
				if (item.description + item.units === selected) {
					setSelectedThumb(item.image);
					if (item.image && item.image.length > 0) {
						setProductImage(item.image);
					}
				}
			});
		}
	};

	const selectThumb = (
		event: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		const id = event.currentTarget.id.substring(6);
		if (productThumbs) {
			const selectedOption =
				productThumbs[+id].description + productThumbs[+id].units;
			setSelectedThumb(productThumbs[+id].image);
			setProductImage(productThumbs[+id].image);
			setSelectedValue(selectedOption);
			const title = productUnit(selectedOption);
			setProductOptions(title);
		}
	};

	const displayProductThumbs = () => {
		return (
			<div className={classes['product-detail_variations-grid']}>
				{productThumbs?.map((price, index) => {
					return (
						<div key={index}>
							<img
								id={`thumb-${index}`}
								className={`
									${classes['product-detail_variations-image']} ${
									selectedThumb === price.image &&
									classes[
										'product-detail_variations-image-selected'
									]
								}
								`}
								src={`${configData.IMAGES}/products/${price.image}`}
								alt=''
								onClick={selectThumb}
							/>
						</div>
					);
				})}
			</div>
		);
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

	if (!products) {
		return null;
	}

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
						<div
							className={
								classes['product-detail__image--wrapper']
							}>
							{imageHandler()}
						</div>
						{displayProductThumbs()}
					</div>
					<div className={classes['product-detail']}>
						<h1>
							{products?.title !== undefined
								? parser(products?.title)
								: ''}
						</h1>
						<ul className={classes['products-detail-pricing']}>
							{filterPricing()}
						</ul>
						<form name='addToCart' onSubmit={addToCartHandler}>
							<div
								className={
									classes['product-detail__selection']
								}>
								{products?.pricing.length! > 1 && (
									<p
										className={
											classes[
												'product-detail__select--options'
											]
										}>
										{parse(productOptions)}
									</p>
								)}
								{products?.pricing.length! > 1 && (
									<select
										name='product_select'
										value={selectedValue}
										onChange={productSelectHandler}
										className={
											classes[
												'products-detail-pricing__select'
											]
										}>
										<option value=''>Select size</option>
										{selectList.map((price, key) => {
											return (
												<option
													key={key}
													value={
														price.description +
														price.units
													}>
													{price.description}
												</option>
											);
										})}
									</select>
								)}
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
