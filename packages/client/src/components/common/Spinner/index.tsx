import React, { ReactElement } from 'react'
import classnames from 'classnames'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import styles from './Spinner.module.scss'

interface ISpinner {
	className?: string
	size?: number
}

const defaultProps = {
	className: undefined,
	size: 100,
}

const Spinner = ({ className, size }: ISpinner): ReactElement => (
	<div className={classnames(styles.spinnerContainer, className)}>
		<Loader type="Oval" color="#0a62ff" height={size} width={size} />
	</div>
)

Spinner.defaultProps = defaultProps

export default Spinner
