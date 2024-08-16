import type { Meta, StoryObj } from '@storybook/react'
import { ButtonField } from './index'

const meta = {
  component: ButtonField,
} satisfies Meta<typeof ButtonField>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: 'Hello World',
    color: 'purple',
  },
}
