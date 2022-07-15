import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Orders } from '../cart/orders';
import Image from '../../shared/components/UIElements/Images';
import { parser } from '../../shared/hooks/html-parse';
import DeliveryInstructions from './delivery-instructions';
import { round } from '../../shared/util/math-utilities';

import configData from '../../config.json';
import classes from './shopping-cart.module.css';

const dollarUSLocale = Intl.NumberFormat('en-US');
function calculateCost(qty: number, price: number, fixedDec: boolean): number;
function calculateCost(qty: number, price: number): string;
function calculateCost(
	qty: number,
	price: number,
	fixedDec: boolean = false
): string | number {
	const total: number = qty * price;
	return fixedDec ? total.toFixed(2) : total;
}

const ShoppingCart = () => {
	const [total, setTotal] = useState(0);
	const [showDeliveryComments, setShowDeliveryComments] = useState(false);
	const [pickupState, setPickupState] = useState('');
	const [cartItems, setCartItems] = useState<Orders[]>(() =>
		localStorage.getItem('order')
			? (JSON.parse(localStorage.getItem('order')!) as Orders[])
			: []
	);
	const [deliveryInst, setDeliveryInst] = useState<string | undefined>('');

	const purchaseOrder = useRef<HTMLInputElement>(null);
	const deliveryDate = useRef<HTMLInputElement>(null);
	const deliveryNotes = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		let cartTotal: number = 0;

		cartItems.forEach((item) => {
			cartTotal = cartTotal + calculateCost(item.qty, item.price, false);
		});

		setTotal(cartTotal);
	}, [cartItems]);

	const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target);
		const indexKey = event.target.dataset['orderIndex']!;
		const newQty = event.target.value;

		setCartItems((cartItems) => {
			// clone the array of cart objects
			const newCartItems = [...cartItems];
			// update the quantity in the clone
			// newCartItems[parseInt(indexKey, 10)].qty = parseInt(newQty, 10);
			newCartItems[parseInt(indexKey, 10)].qty = round(
				parseFloat(newQty)
			);
			// save update to local storage
			localStorage.setItem('order', JSON.stringify(newCartItems));
			// return the cloned and update array to update the cartItems.
			return newCartItems;
		});
	};

	const removeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const indexKey = event.currentTarget.name;
		console.log('Remove this cart item', indexKey);

		setCartItems((cartItems) => {
			// clone the array of cart objects
			const newCartItems = [...cartItems];
			// remove the item at the index
			newCartItems.splice(parseInt(indexKey), 1);
			// save update to local storage
			localStorage.setItem('order', JSON.stringify(newCartItems));
			// return the cloned and update array to update the cartItems.
			return newCartItems;
		});
	};

	const checkoutOptionHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		console.log('delivery instructions:', event.target.value);
		setPickupState(event.target.value);
	};

	const checkoutHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const checkout = {
			purchaseOrder: purchaseOrder.current?.value,
			deliveryDate: deliveryDate.current?.value,
			deliveryNotes: deliveryInst,
		};
		console.log('checkout!', checkout);
	};

	const addDeliveryCommentHandler = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		console.log('delivery notes:', deliveryNotes.current?.value);
		setDeliveryInst(deliveryNotes.current?.value);
		setShowDeliveryComments(false);
	};

	const openDeliveryComments = () => {
		deliveryNotes.current?.focus();
		setShowDeliveryComments(true);
	};

	const setTheStep = (unit: string | undefined) => {
		const unitsArray = ['lbs', 'ton', 'tons', 'yds', 'yds', 'ft', 'cu ft'];
		if (!unit) {
			return;
		}
		return unitsArray.includes(unit) ? '0.01' : '1';
	};

	return (
		<>
			<DeliveryInstructions
				showDeliveryComments={showDeliveryComments}
				setShowDeliveryComments={setShowDeliveryComments}
				deliveryNotes={deliveryNotes}
				addDeliveryCommentHandler={addDeliveryCommentHandler}
			/>
			<div id={classes['shopping-cart']}>
				<h3>Shopping Cart</h3>
				<div className={classes['shopping-cart']}>
					<div className={classes['shopping-cart__grid']}>
						<form name='checkout' onSubmit={checkoutHandler}>
							{cartItems.map((order, key) => {
								return (
									<div
										key={key}
										className={
											classes[
												'shopping-cart__order--items'
											]
										}>
										<div
											className={
												classes[
													'shopping-cart__order--items-image-title'
												]
											}>
											<Link
												to={`/category/${order.categoryId}/product/${order.id}/sku/${order.sku}`}>
												{order.image ? (
													<img
														src={`${configData.IMAGES}/products/${order.image}`}
														alt={
															order.title !==
															undefined
																? order.title
																: ''
														}
													/>
												) : (
													// <Image
													// 	src={[
													// 		`${configData.IMAGES}/products/${order.image}`,
													// 		`${configData.IMAGES}/products/default_image.png`,
													// 	]}
													// 	alt={
													// 		order.title !==
													// 		undefined
													// 			? order.title
													// 			: ''
													// 	}
													// />
													<img
														src={`${configData.IMAGES}/products/default_image.png`}
														alt={order.title}
													/>
												)}

												<p
													className={
														classes[
															'shopping-cart__order--items-title'
														]
													}>
													{order.title}
												</p>
											</Link>
										</div>

										<div
											className={
												classes[
													'shopping-cart__order--item-cell'
												]
											}>
											<div>{order.sku}</div>
											{order.color && (
												<div>{order.color}</div>
											)}
										</div>
										<div
											className={
												classes[
													'shopping-cart__order--item-cell'
												]
											}>
											${order.price.toFixed(2)}
										</div>
										<div
											className={`${classes['shopping-cart__order--item-input-container']}`}>
											<input
												type='number'
												data-order-index={key}
												min='1'
												step={setTheStep(order.unit)}
												name={`cart_qty_${key}`}
												value={order.qty}
												disabled={false}
												onChange={onQuantityChange}
												className={
													classes[
														'shopping-cart__order--quantity-input'
													]
												}
											/>
											<p>{order.unit}</p>
										</div>
										<div
											className={
												classes[
													'shopping-cart__order--item-total-cost'
												]
											}>
											<p>
												$
												{dollarUSLocale.format(
													calculateCost(
														order.qty,
														order.price,
														true
													)
												)}
											</p>
											<button
												className={
													classes[
														'shopping-cart__order--item-remove'
													]
												}
												onClick={removeHandler}
												name={`${key}`}>
												Remove
											</button>
										</div>
									</div>
								);
							})}
							<section
								className={
									classes['shopping-cart__checkout--section']
								}>
								<div
									className={
										classes[
											'shopping-cart__checkout--options'
										]
									}>
									<h4
										className={
											classes[
												'shopping-cart__checkout--options-title'
											]
										}>
										Checkout Option
									</h4>
									<span
										className={
											classes[
												'shopping-cart__checkout--options-alert'
											]
										}>
										Choose checkout option Pickup from store
										or delivery
									</span>
								</div>
								<div>
									<div
										className={
											classes[
												'shopping-cart__checkout-options--radio'
											]
										}>
										<label>
											<input
												onChange={checkoutOptionHandler}
												id='CX-Pickup'
												name='cxtype'
												type='radio'
												value='pickup'
											/>
											In-Store Pickup
										</label>
									</div>
									<div
										className={
											classes[
												'shopping-cart__checkout-options--radio'
											]
										}>
										<label>
											<input
												onChange={checkoutOptionHandler}
												id='CX-Delivery'
												name='cxtype'
												type='radio'
												value='delivery'
											/>
											Delivery
										</label>
									</div>
									<div
										className={
											classes[
												'shopping-cart__checkout-options--po-option'
											]
										}>
										<label>PO# (Optional) </label>
										<input
											className={
												classes[
													'shopping-cart__checkout-options--po-option--text'
												]
											}
											name='purchase-order'
											type='text'
											size={10}
											ref={purchaseOrder}
										/>
									</div>
								</div>

								{pickupState === 'pickup' && (
									<div className='checkout__in-store-pickup'>
										<div
											className={
												classes[
													'checkout__pickup-group'
												]
											}>
											<h4
												className={
													classes[
														'checkout__delivery-group-title'
													]
												}>
												In Store Pickup
											</h4>
											<span
												className={
													classes[
														'checkout__pickup-alert'
													]
												}>
												Your order will be available at
												our location for pickup.
											</span>
										</div>
										<div
											className={
												classes[
													'checkout__pickup-container'
												]
											}>
											<p
												className={
													classes[
														'checkout__pickup-notice-all'
													]
												}>
												In Store Pickup Orders Will Have
												A 1-Hour Lead Time For
												Processing
											</p>
											<div
												className={
													classes[
														'checkout__button--container'
													]
												}>
												<button
													type='submit'
													className={
														classes[
															'checkout__button'
														]
													}>
													Check Out
												</button>
											</div>
										</div>
									</div>
								)}
								{pickupState === 'delivery' && (
									<div className='checkout__delivery-setup'>
										<div
											className={
												classes[
													'checkout__delivery-group'
												]
											}>
											<h4
												className={
													classes[
														'checkout__delivery-group-title'
													]
												}>
												Delivery Instructions /
												Information
											</h4>
											<span
												className={
													classes[
														'checkout__delivery-alert'
													]
												}>
												Delivery date and Instructions
												are required to proceed to
												checkout
											</span>
										</div>
										<div
											className={
												classes[
													'checkout__delivery-container'
												]
											}>
											<div
												className={
													classes[
														'checkout__delivery-info-container'
													]
												}>
												<div
													className={
														classes[
															'checkout__delivery-date'
														]
													}>
													<div>
														<label>
															Requested Delivery
															Date
														</label>
														<p>(Required)</p>
													</div>
													<div>
														<input
															type='date'
															name='delivery-date'
															ref={deliveryDate}
														/>
													</div>
												</div>
												<div
													className={
														classes[
															'checkout__delivery-notice'
														]
													}>
													{/* We try our very best to
												accommodate your requested
												delivery date, however, due to
												traffic conditions, weather,
												etc., we do not guarantee any
												delivery dates or times. Often
												times, we are able to deliver
												before your requested date. Our
												staff will contact you to
												confirm your delivery date and
												time within 1 business day. No
												deliveries will be made on
												weekends and Holidays. */}
												</div>
												<p
													className={
														classes[
															'checkout__delivery-notice-all'
														]
													}>
													{/* Notice: All Deliveries will have
												a 48-hour lead up and delivery
												will only be available Monday -
												Friday. */}
												</p>
												<div
													className={
														classes[
															'checkout__delivery-date'
														]
													}>
													<div>
														<label>
															Delivery
															Instructions
														</label>
														<p>(Required)</p>
													</div>
													<div>
														<button
															className={
																classes[
																	'checkout__delivery-instructions-button'
																]
															}
															onClick={
																openDeliveryComments
															}>
															Edit Delivery Notes
														</button>
													</div>
												</div>
											</div>
											<div
												className={
													classes[
														'checkout__button--container'
													]
												}>
												<button
													type='submit'
													className={
														classes[
															'checkout__button'
														]
													}>
													Check Out
												</button>
											</div>
										</div>
									</div>
								)}
							</section>
						</form>
					</div>
					<div className={classes['shopping-cart__order-subtotal']}>
						<h3>SubTotal</h3>
						<p>${dollarUSLocale.format(total)}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShoppingCart;
