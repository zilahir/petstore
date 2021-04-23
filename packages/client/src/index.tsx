import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import ReactDOM from 'react-dom'

import App from './app'
import queryClient from './api/queryClient'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Router>
	</React.StrictMode>,
	document.querySelector('#root'),
)
