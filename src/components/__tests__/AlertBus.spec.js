import { describe, it, beforeEach, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import AlertBus from '../AlertBus/AlertBus.vue'

const vuetify = createVuetify()

describe('AlertBus', () => {
  /**
   * @type {import('@vue/test-utils').Wrapper<Vue>}
   * @let {Wrapper<Vue>} wrapper
   */
  let wrapper

  beforeEach(() => {
    wrapper = mount(AlertBus, {
      global: {
        plugins: [vuetify]
      },
      props: {
        alert: true,
        closable: true,
        type: 'warning',
        title: 'Warning',
        text: 'This is a warning'
      }
    })
  })

  it('renders the alert when `alert` is true', () => {
    expect(wrapper.find('[data-test-alert-bus]').exists()).toBe(true)
    expect(wrapper.find('[data-test-alert]').exists()).toBe(true)
  })

  it('does not render the alert when `alert` is false', async () => {
    await wrapper.setProps({ alert: false })
    expect(wrapper.find('[data-test-alert-bus]').exists()).toBe(false)
  })
  it('render properly the props received on the component', () => {
    expect(wrapper.find('[data-test-alert-bus]').exists()).toBe(true)
    expect(wrapper.find('[data-test-alert]').exists()).toBe(true)
    expect(wrapper.find('[data-test-alert]').attributes('type')).toBe('warning')
    expect(wrapper.find('[data-test-alert]').attributes('title')).toBe('Warning')
    expect(wrapper.find('[data-test-alert]').attributes('text')).toBe('This is a warning')
  })
})
