import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import client from './react-query-client';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import CategoryDetail from './components/product-categories/category-detail';
import CategoryList from './components/product-categories/category-list';
import ProductDetail from './components/product-categories/product-detail/product-detail';
import ShoppingCart from './components/cart/shopping-cart';
import Registration from './components/users/create-user';
import UserLogin from './components/users/user-login';
import ContentWrapper from './components/content/content-wrapper';
import Layout from './components/page-elements/Layout';
import Profile from './components/users/profile';
import ChangePassword from './components/users/change-password';

import TestRedux from './components/product-categories/test-redux';
import TestImages from './components/product-categories/test-images';

const queryClient = new QueryClient();

function App() {
	const { userId, firstName, lastName, token, login, logout } = useAuth();

	return (
		<QueryClientProvider client={queryClient}>
			<AuthContext.Provider
				value={{
					isLoggedIn: !!token,
					token: token,
					userId: userId,
					firstName: firstName,
					lastName: lastName,
					login: login,
					logout: logout,
				}}>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route path='/' element={<CategoryList />} />
						<Route path='/home' element={<CategoryList />} />
						<Route path='/products' element={<CategoryList />} />
						<Route
							path='/category/:categoryId/product/:productId/sku/:sku'
							element={<ProductDetail />}
						/>
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
						<Route path='/user/profile' element={<Profile />} />
						<Route
							path='/user/change-password'
							element={<ChangePassword />}
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
						<Route path='/test-image' element={<TestImages />} />
					</Route>
				</Routes>
			</AuthContext.Provider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
