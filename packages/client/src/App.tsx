import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'

const App = (): ReactElement => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/register" component={Register} />
	</Switch>
)

export default App
