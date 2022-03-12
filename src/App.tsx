import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './react-query-client';

import CategoryDetail from './components/product-categories/category-detail';

import CategoryList from './components/product-categories/category-list';

import ProductDetail from './components/product-categories/product-detail';

function App() {
	return (
		<div className='container'>
			<QueryClientProvider client={client}>
				<Router>
					<Routes>
						<Route path='/*' element={<CategoryList />} />
						<Route
							path='/category/:categoryId/product/:productId'
							element={<ProductDetail />}
						/>
						<Route
							path='/category/:categoryId/*'
							element={<CategoryDetail />}
						/>
					</Routes>
				</Router>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</div>
	);
}

export default App;
