import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import store from '../src/redux/store';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
	<Provider store={store}>
		<Router>
			<Routes>
				<Route path='/*' element={<App />} />
			</Routes>
		</Router>
	</Provider>
);
