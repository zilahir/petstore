import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'

const App = (): ReactElement => (
	<Switch>
		<Route exact path="/" component={Home} />
	</Switch>
)

export default App
