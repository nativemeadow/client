import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './react-query-client';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import CategoryDetail from './components/product-categories/category-detail';
import CategoryList from './components/product-categories/category-list';
import ProductDetail from './components/product-categories/product-detail';
import ShoppingCart from './components/cart/shopping-cart';
import Registration from './components/users/create-user';
import RegistrationSuccess from './components/users/create-user-success';
import UserLogin from './components/users/user-login';
import ContentWrapper from './components/content/content-wrapper';
import Layout from './components/page-elements/Layout';

import TestRedux from './components/product-categories/test-redux';

function App() {
	const { userId, token, login, logout } = useAuth();

	return (
		<QueryClientProvider client={client}>
			<AuthContext.Provider
				value={{
					isLoggedIn: !!token,
					token: token,
					userId: userId,
					login: login,
					logout: logout,
				}}>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route path='/' element={<CategoryList />} />
						<Route path='/home' element={<CategoryList />} />
						<Route path='/products' element={<CategoryList />} />
						<Route
							path='/category/:categoryId/product/:productId'
							element={<ProductDetail />}
						/>
						<Route
							path='/category/:categoryId/*'
							element={<CategoryDetail />}
						/>
						<Route
							path='/shopping-cart'
							element={<ShoppingCart />}
						/>
						<Route path='/login' element={<UserLogin />} />
						<Route
							path='/user/create-account'
							element={<Registration />}
						/>
						<Route
							path='/user/create-account-success'
							element={<RegistrationSuccess />}
						/>
						<Route
							path='services'
							element={<ContentWrapper title={'Services'} />}
						/>
						<Route
							path='resources'
							element={<ContentWrapper title={'Resource'} />}
						/>
						<Route
							path='sustainability'
							element={
								<ContentWrapper title={'Sustainability'} />
							}
						/>
						<Route
							path='faq'
							element={<ContentWrapper title={'FAQ'} />}
						/>
						<Route
							path='contact-us'
							element={<ContentWrapper title={'Contact Us'} />}
						/>
						<Route path='/test-redux' element={<TestRedux />} />
					</Route>
				</Routes>
			</AuthContext.Provider>
			{/* <Signup />
			<Connect />
			<Footer /> */}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
