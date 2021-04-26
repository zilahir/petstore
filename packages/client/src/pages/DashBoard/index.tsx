/* eslint-disable no-underscore-dangle */
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

import { apiEndPoints } from '../../api/apiEndpoints'
import { get } from '../../api/cloudFunctions'
import Layout from '../../components/common/Layout'
import { TopLevelState } from '../../store/configureStore'
import styles from './DashBoard.module.scss'
import Button from '../../components/common/Button'

const DashBoard = (): ReactElement => {
	const { user } = useSelector((store: TopLevelState) => store)
	const { data, isFetched } = useQuery(
		'petsByUser',
		() =>
			(get({
				url: `${apiEndPoints.getPetsByUser}/${user._id}`,
			}) as unknown) as Array<any>,
	)
	return (
		<Layout>
			<div className={styles.dashboardRootContainer}>
				<div className={styles.petContainer}>
					<h1>My Pets</h1>
					{data && isFetched && data.length > 0 && (
						<ul>
							{data.map((pet: any) => (
								<li key={pet.name}>
									<div>{pet.name}</div>
									<div className={styles.actionBtnContainer}>
										<Button
											label="Delete"
											onClick={() => console.debug('delete')}
											icon={<DeleteIcon htmlColor="#6c63ff" />}
											className={styles.actionBtn}
										/>
										<Button
											label="Delete"
											onClick={() => console.debug('delete')}
											icon={<CreateIcon htmlColor="#6c63ff" />}
											className={styles.actionBtn}
										/>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
				<div>right</div>
			</div>
		</Layout>
	)
}

export default DashBoard
