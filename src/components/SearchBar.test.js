import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from './SearchBar.vue'

describe('SearchBar', () => {
  test('emits search event when Enter is pressed', async () => {
    const wrapper = mount(SearchBar)

    const input = wrapper.find('input')
    await input.setValue('Breaking Bad')
    await input.trigger('keyup.enter')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['Breaking Bad'])
  })
})

test('does not emit search event when input is empty', async () => {
  const wrapper = mount(SearchBar)

  const input = wrapper.find('input')
  await input.setValue('')
  await input.trigger('keyup.enter')

  expect(wrapper.emitted('search')).toBeFalsy()
})

test('emits search event when button is clicked', async () => {
  const wrapper = mount(SearchBar)

  await wrapper.find('input').setValue('Lost')
  await wrapper.find('button').trigger('click')

  expect(wrapper.emitted('search')).toBeTruthy()
  expect(wrapper.emitted('search')[0]).toEqual(['Lost'])
})
