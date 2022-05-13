import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/FormElements/Button';

import classes from './TopBar.module.css';

const TopBar: React.FC = (props: {}) => {
	const auth = useContext(AuthContext);

	return (
		<div className={classes['top-bar']}>
			<div className={classes['container']}>
				<ul className={classes['top-bar__items']}>
					<li className={classes['top-bar__item']}>
						{!auth.isLoggedIn && (
							<Link to={`/login`}>Account Login</Link>
						)}
						{auth.isLoggedIn && (
							<Button
								override={classes['button--default']}
								size='small'
								type='button'
								onClick={auth.logout}>
								LOGOUT
							</Button>
						)}
					</li>
					<li className={classes['top-bar__item']}>
						<a href='#'>Company</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default TopBar;
