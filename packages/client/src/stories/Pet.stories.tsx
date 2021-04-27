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
			status={Status.avaliable}
			name="Pablo"
			category="Pug"
			tags={[1, 2]}
			photoUrls={[
				'https://petstorepets.s3.eu-west-1.amazonaws.com/vEU8W7cwE.png',
			]}
			petId="608703307b65cdbecf671154"
		/>
	</div>
)
