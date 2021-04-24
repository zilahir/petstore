import React, { ReactElement } from 'react'
import Layout from '../../components/common/Layout'

import PetGrid from '../../components/PetGrid'

const Home = (): ReactElement => (
	<Layout>
		<PetGrid />
	</Layout>
)

export default Home
