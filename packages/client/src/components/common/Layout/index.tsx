import React, { ReactChild, ReactChildren, ReactElement } from 'react'

import styles from './Layout.module.scss'

interface ILayout {
	children: ReactChild | ReactChildren
}

const Layout = ({ children }: ILayout): ReactElement => (
	<div className={styles.layout}>{children}</div>
)

export default Layout
