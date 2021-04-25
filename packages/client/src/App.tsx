import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { IUSer, TopLevelState } from './store/configureStore'

const useAuth = (): IUSer => useSelector((store: TopLevelState) => store.user)

function PrivateRoute({ children, ...rest }: RouteProps): ReactElement {
	const auth = useAuth()
	return (
		<Route
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...rest}
			render={({ location }) =>
				auth.token ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	)
}

const App = (): ReactElement => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/register" component={Register} />
		<Route exact path="/login" component={Login} />
		<PrivateRoute exact path="/dashboard" component={DashBoard} />
	</Switch>
)

export default App
