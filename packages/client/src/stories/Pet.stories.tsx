import React from 'react'
import { Meta } from '@storybook/react'

import OnePet from '../components/PetGrid/Pet'
import { Status } from '../../../server/src/models/pet'
import PetDocs from './markdowns/Pet.md'

export default {
	title: 'Pet',
	component: OnePet,
	parameters: {
		notes: [PetDocs],
	},
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as Meta

export const Pet = () => (
	<div
		style={{
			maxWidth: 500,
			margin: '0 auto',
		}}
	>
		<OnePet
			userId="608660c99cfd2a48a19c4fb9"
			status={Status.available}
			name="demo"
			category="demo"
			tags={[1, 2]}
			photoUrls={['1']}
		/>
	</div>
)
