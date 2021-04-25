import React, { ReactElement } from 'react'

import Layout from '../../components/common/Layout'
import styles from './DashBoard.module.scss'

const DashBoard = (): ReactElement => (
	<Layout>
		<div className={styles.dashboardRootContainer}>
			<div>left</div>
			<div>right</div>
		</div>
	</Layout>
)

export default DashBoard
