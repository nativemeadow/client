import React from 'react';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';

import classes from './delivery-instructions.module.css';

const DeliveryInstructions = ({
	showDeliveryComments,
	setShowDeliveryComments,
	deliveryNotes,
	addDeliveryCommentHandler
}: {
	showDeliveryComments: any;
	setShowDeliveryComments: any;
	deliveryNotes: any;
	addDeliveryCommentHandler: any;
}) => {

	const closeDeliveryComments = () => {
		setShowDeliveryComments(false);
	};

	const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		deliveryNotes.current = event.target.value;
	}

	return (
		<div>
			<Modal
				show={showDeliveryComments}
				onCancel={closeDeliveryComments}
				header={'Order Comments'}
				headerClass={classes['delivery__modal-header']}
				contentClass={classes['delivery__modal-content']}
				footerClass={classes['delivery__modal-actions']}
				footer={
					<Button onClick={addDeliveryCommentHandler}>Save</Button>
				}>
				<div className={classes['delivery-comments-container']}>
					<p className={classes['delivery__order-instructions']}>
						PLEASE NOTE: Our delivery trucks will not be able to go
						off pavement. We can either dump on your driveway or on
						the street (customer must be present to dump on public
						streets). Please make sure that our delivery trucks
						could be accommodated on your site before placing your
						order. Now, please let us know where you would like us
						to leave your materials.
					</p>
					<textarea
						className={classes['delivery__modal-textarea']}
						cols={58}
						rows={10}
						value={deliveryNotes.current?.value}
						ref={deliveryNotes}
						name='store_comments'></textarea>
				</div>
			</Modal>
		</div>
	);
};

export default DeliveryInstructions;
