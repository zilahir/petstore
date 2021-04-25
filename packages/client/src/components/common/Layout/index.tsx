import React, { ReactChild, ReactElement } from 'react'

import Header from '../../Header'
import styles from './Layout.module.scss'

interface ILayout {
	hasHeader?: boolean
	children: ReactChild | ReactChild[]
}

const defaultProps = {
	hasHeader: true,
}

const Layout = ({ children, hasHeader }: ILayout): ReactElement => (
	<div className={styles.layout}>
		{hasHeader && <Header />}
		{children}
	</div>
)

Layout.defaultProps = defaultProps

export default Layout
