import React from 'react';

import classes from './product-calculator.module.css';

const productCalculator = () => {
	const size = 5;

	const lengthChangeHandler = () => {};
	const widthChangeHandler = () => {};
	const sqFootChangeHandler = () => {};
	const depthChangeHandler = () => {};
	const calcFootChangeHandler = () => {};
	const calcInchChangeHandler = () => {};
	return (
		<>
			<div id='lyngso-calculator' className={classes['calculator-modal']}>
				{/* <span className='close' data-dismiss='modal' aria-label='Close'>
					<span aria-hidden='true'>×</span>
				</span> */}

				<div className='modal-body'>
					<div className={classes['calculator-container']}>
						<div
							className={`${classes['calculator-length-input']} ${classes['input-cell']}`}>
							<label className={classes['calc-label']}>
								length
							</label>
							<input
								id='calc-length'
								type='text'
								name='length'
								size={size}
								maxLength={size}
								className={classes['calc-input']}
								onChange={lengthChangeHandler}
							/>
							<div className={classes['calc-detail']}>feet</div>
						</div>
						<div
							className={`${classes['calculate-times1']} ${classes['do-grp']}`}>
							<span>×</span>
						</div>

						<div
							className={`${classes['calculator-length-width']} ${classes['calculator-width-input']} ${classes['align-cell-content']} ${classes['input-cell']}`}>
							<label className={classes['calc-label']}>
								width
							</label>
							<input
								id='calc-width'
								type='text'
								name='width'
								size={size}
								maxLength={size}
								className={classes['calc-input']}
								onChange={widthChangeHandler}
							/>
							<div className={classes['calc-detail']}>feet</div>
						</div>

						<div
							className={`${classes['calculate-or']} ${classes['do-grp']} ${classes['txtlabel']}`}>
							<span>or</span>
						</div>

						<div
							className={`${classes['calculator-square-feet']} ${classes['align-cell-content']} ${classes['input-cell']}`}>
							<label className={classes['calc-label']}>
								square footage
							</label>
							<input
								id='calc-sqfoot'
								type='text'
								name='sqfoot'
								size={size}
								maxLength={size}
								className={`${classes['calc-input']} ${classes['square-footage']}`}
								onChange={sqFootChangeHandler}
							/>
							<div className={classes['calc-detail']}>
								ft<sup>2</sup>
							</div>
						</div>

						<div
							className={`${classes['calculate-times2']} ${classes['do-grp']}`}>
							<span>×</span>
						</div>

						<div
							className={`${classes['calculator-input-depth']} ${classes['align-cell-content']} ${classes['input-cell']}`}>
							<label className={classes['calc-label']}>
								depth
							</label>
							<input
								id='calc-depth'
								type='text'
								name='depth'
								size={size}
								maxLength={size}
								className={classes['calc-input']}
								onChange={depthChangeHandler}
							/>
							<ul className={classes['depth-radio-set']}>
								<li>
									<input
										id='calc-inch'
										name='depthMeasure'
										type='radio'
										value='12'
										onChange={calcInchChangeHandler}
									/>
									inches
								</li>
								<li>
									<input
										id='calc-foot'
										name='depthMeasure'
										type='radio'
										value='1'
										onChange={calcFootChangeHandler}
									/>
									feet
								</li>
							</ul>
						</div>
						<div></div>
						<div
							className={`${classes['calculate-calculate-button']} ${classes['input-cell']} ${classes['calculate-button']}`}>
							<button id='go-calc' className='button go-calc'>
								Calculate
							</button>
							<div
								id='reset-calc'
								className={classes['calc-detail']}>
								Reset
							</div>
						</div>
					</div>
				</div>
				{/* <div className='modal-footer'>
					<div id='calculator-results'>
						<div className='row bb-d py10'>
							<div className='col-xs-12 col-sm-6 clcr1'>
								<span id='cubic-label' className='single-label'>
									Cubic Yards (yd<sup>3</sup>) Needed:
								</span>
								<span
									id='cubic-result'
									className='single-total'></span>
							</div>
						</div>
						<div className='row bb-d py10'>
							<div className='col-xs-12 col-sm-6 clcr2'>
								<span id='usk-label' className='single-label'>
									U-sacks Needed:
								</span>
								<span
									id='usk-total'
									className='single-total'></span>
							</div>
							<div className='col-xs-12 col-sm-6 usk-notice'>
								<span>
									U-Sacks are not available for purchase
									online. Please visit our store to U-Sack it
									yourself!
								</span>
							</div>
						</div>
						<div className='row mx15 py10'>
							<div className='col-xs-12 col-sm-2 totals'>
								<span className='calc-label'>
									Cubic Yard (yd<sup>3</sup>)
								</span>
								<span id='cubic-result2'></span>
							</div>
							<div className='col-xs-12 col-sm-4 totals'>
								<span className='calc-label'>
									Online Minimum (yd<sup>3</sup>)
									<span className='mm'>
										(1 yard For Delivery)
									</span>
								</span>
								<span id='adjusted-result'></span>
							</div>
							<div className='col-xs-12 col-sm-1 math'>
								<span>×</span>
							</div>
							<div className='col-xs-12 col-sm-2 totals'>
								<span className='calc-label'>
									Cost/yd<sup>3</sup>
								</span>
								<span id='yard-cost'></span>
							</div>
							<div className='col-xs-12 col-sm-1 math'>
								<span>=</span>
							</div>
							<div className='col-xs-12 col-sm-2 totals'>
								<span className='calc-label'>Subtotal</span>
								<span id='yard-subtotal'></span>
							</div>
						</div>
						<div className='row'>
							<div className='col-xs-12 col-sm-offset-4 col-sm-4'>
								<span id='calc-add' className='button'>
									Add to Cart
								</span>
							</div>
						</div>
					</div>
				</div>*/}
			</div>
		</>
	);
};

export default productCalculator;
