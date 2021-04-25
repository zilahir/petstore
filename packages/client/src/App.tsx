import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const App = (): ReactElement => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/register" component={Register} />
		<Route exact path="/login" component={Login} />
	</Switch>
)

export default App
