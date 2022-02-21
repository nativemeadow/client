import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import client from './react-query-client';

import CategoryDetail from './components/product-categories/category-detail';

import CategoryList from './components/product-categories/category-list';

function App() {
	return (
		<QueryClientProvider client={client}>
			<Router>
				<Routes>
					<Route path='/' element={<CategoryList />} />
					<Route
						path='/category/:categoryId'
						element={<CategoryDetail />}
					/>
				</Routes>
			</Router>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
