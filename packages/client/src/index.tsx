import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { ToastProvider } from 'react-toast-notifications'
import App from './app'
import queryClient from './api/queryClient'
import { persistor, store } from './store/configureStore'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<QueryClientProvider client={queryClient}>
						<ToastProvider autoDismiss placement="bottom-right">
							<App />
						</ToastProvider>
					</QueryClientProvider>
				</Router>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.querySelector('#root'),
)
