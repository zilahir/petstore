import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Login from './pages/Login'
import LogOut from './pages/LogOut'
import Register from './pages/Register'
import { IUSer, TopLevelState } from './store/configureStore'

const useAuth = (): IUSer => useSelector((store: TopLevelState) => store.user)

/**
 *
 *
 * @param {RouteProps} children ReactElements the children should be rendered
 * @returns {ReactElement} Returns a ReactElement represents either a Route
 * with it's children
 * Redirects to login otherwise
 */
function PrivateRoute({ children, ...rest }: RouteProps): ReactElement {
	const auth = useAuth().token || false
	return auth ? (
		<Route
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
			render={() => children}
		/>
	) : (
		<Redirect to="/login" />
	)
}

const App = (): ReactElement => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/register" component={Register} />
		<Route exact path="/login" component={Login} />
		<Route exact path="/logout" component={LogOut} />
		<PrivateRoute exact path="/dashboard" component={DashBoard} />
		<PrivateRoute exact path="/inventory" component={Inventory} />
	</Switch>
)

export default App
