import React from 'react'
import { mount } from 'enzyme'
import Code from './Code'

describe('The Code component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: ''
    }
    const component = mount(<Code name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(0)
  })

  it('error on minimum length', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: '1'
    }
    const component = mount(<Code name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(1)
  })

  it('error on maximum length', () => {
    const expected = {
      name: 'input-focus',
      label: 'Text input focused',
      value: '123'
    }
    const component = mount(<Code name={expected.name} label={expected.label} value={expected.value} />)
    component.find('input').simulate('change')
    expect(component.find('label').text()).toEqual(expected.label)
    expect(component.find('input').length).toEqual(1)
    expect(component.find('.usa-input-error-label').length).toEqual(1)
  })
})
