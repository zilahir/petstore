import React, { ReactChild, ReactElement } from 'react'

import Header from '../../Header'
import styles from './Layout.module.scss'

interface ILayout {
	children: ReactChild | ReactChild[]
}

const Layout = ({ children }: ILayout): ReactElement => (
	<div className={styles.layout}>
		<Header />
		{children}
	</div>
)

export default Layout
