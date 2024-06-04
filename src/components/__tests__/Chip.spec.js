import { describe, it, beforeEach, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import Chip from '../Chip/Chip.vue'

const vuetify = createVuetify()

describe('Chip', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Chip, {
      global: {
        plugins: [vuetify]
      },
      props: {
        color: 'green',
        icon: 'mdi-icon',
        description: 'description'
      }
    })
  })

  it('renders properly with the props received', () => {
    expect(wrapper.find('[data-test-chip]').exists()).toBe(true)
    expect(wrapper.find('[data-test-chip-description]').exists()).toBe(true)
    expect(wrapper.find('[data-test-chip-description]').text()).toBe('description')
    expect(wrapper.find('[data-test-chip-icon]').exists()).toBe(true)
  })

  it('has the correct color attribute', () => {
    const chip = wrapper.find('[data-test-chip]')
    expect(chip.exists()).toBe(true)
    expect(chip.attributes('color')).toBe('green')
  })

  it('displays the correct icon', () => {
    const icon = wrapper.find('[data-test-chip-icon]')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('icon')).toBe('mdi-icon')
  })
  it('does not render description when description prop is not provided', async () => {
    await wrapper.setProps({ description: '' })
    expect(wrapper.find('[data-test-chip-description]').exists()).toBe(false)
  })
})
