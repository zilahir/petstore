import React, { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { removeUser } from '../../store/actions/user'

const LogOut = (): ReactElement => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(removeUser())
	}, [])
	return <Redirect to="/" />
}

export default LogOut
