import React from 'react'
import { mount } from 'enzyme'
import Location, { timeout } from './Location'

describe('The Address component', () => {
  it('Renders without errors', () => {
    const component = mount(<Location />)
    expect(component.find('.location').length).toBe(1)
  })

  it('Renders US Address', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Location onUpdate={onUpdate} layout={Location.US_ADDRESS} />)
    component.find('.street input').simulate('change')
    component.find('.street2 input').simulate('change')
    component.find('.city input').simulate('change')
    component.find('.state input').simulate('change', { target: { value: 'Virginia' } })
    component.find('.zipcode input').simulate('change')
    expect(updates).toBe(5)
  })

  it('Renders Country Address', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Location onUpdate={onUpdate} layout={Location.COUNTRY} country="" />)
    component.find('.country input').simulate('change', { target: { value: 'Germnay' } })
    expect(updates).toBe(1)
  })

  it('Renders modal with just geocode error', () => {
    const expected = {
      name: 'someaddress',
      street: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      country: 'United States',
      suggestions: true,
      layout: Location.ADDRESS,
      geocodeResult: {
        Error: 'error.geocode.partial',
        Suggestions: []
      }
    }

    const component = mount(<Location {...expected} />)
    expect(component.find('.suggestions.modal-content').length).toBe(1)
  })

  it('Renders modal with suggestion and selects it', () => {
    const expected = {
      name: 'someaddress',
      street: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      country: 'United States',
      suggestions: true,
      layout: Location.ADDRESS,
      geocodeResult: {
        Error: 'error.geocode.partial',
        Suggestions: [{
          Address: '123 Some Rd',
          City: 'Arlington',
          State: 'VA',
          Zipcode: '22201'
        }]
      }
    }

    const component = mount(<Location {...expected} />)
    expect(component.find('.suggestions.modal-content').length).toBe(1)
    component.find('.suggestion-btn').first().simulate('click')
    expect(component.find('.suggestions.modal-content').length).toBe(0)
  })

  it('Renders modal with suggestion but selects to use current address', () => {
    const expected = {
      name: 'someaddress',
      street: '123 Some Rd',
      city: 'Arlington',
      state: 'VA',
      zipcode: '22202',
      suggestions: true,
      geocodeResult: {
        Error: 'error.geocode.partial',
        Suggestions: [{
          Address: '123 Some Rd',
          City: 'Arlington',
          State: 'VA',
          Zipcode: '22201'
        }]
      }
    }

    const component = mount(<Location {...expected} />)
    expect(component.find('.suggestions.modal-content').length).toBe(1)
    component.find('.dismiss a').first().simulate('click')
    expect(component.find('.suggestions.modal-content').length).toBe(0)
  })

  it('renders all the things', () => {
    const tests = [
      {
        props: { layout: Location.BIRTHPLACE, country: 'United States' },
        selectors: ['.state', '.city', '.county']
      },
      {
        props: { layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY_COUNTRY, country: 'United States' },
        selectors: ['.state', '.city']
      },
      {
        props: { layout: Location.BIRTHPLACE_WITHOUT_COUNTY, country: 'United States' },
        selectors: ['.state', '.city']
      },
      {
        props: { layout: Location.US_CITY_STATE_ZIP_INTERNATIONAL_CITY, country: 'United States' },
        selectors: ['.city', '.state', '.zipcode']
      },
      {
        props: { layout: Location.ADDRESS, country: 'United States' },
        selectors: ['.street', '.street2', '.city', '.state', '.zipcode']
      },
      {
        props: { layout: Location.CITY_STATE },
        selectors: ['.city', '.state']
      },
      {
        props: { layout: Location.STREET_CITY_COUNTRY },
        selectors: ['.street', '.city', '.country']
      },
      {
        props: { layout: Location.CITY_COUNTRY },
        selectors: ['.city', '.country']
      },
      {
        props: { layout: Location.CITY_STATE_COUNTRY },
        selectors: ['.city', '.state', '.country']
      },
      {
        props: { layout: Location.US_ADDRESS },
        selectors: ['.street', '.city', '.state', '.zipcode']
      },
      {
        props: { layout: Location.STREET_CITY },
        selectors: ['.street', '.city']
      },
      {
        props: { layout: Location.COUNTRY },
        selectors: ['.country']
      },
      {
        props: { layout: 'Something New' },
        selectors: ['.location']
      }
    ]

    tests.forEach(test => {
      const component = mount(<Location {...test.props} />)
      test.selectors.forEach(selector => {
        const found = component.find(selector).length > 0
        if (!found) {
          console.log('props:', test.props)
          console.log('selector:', selector)
        }
        expect(found).toBe(true)
      })
    })
  })

  it('can show spinner', () => {
    const props = {
      spinner: true
    }
    const component = mount(<Location {...props} />)
    expect(component.find('.spinner').length).toBe(1)
  })

  it('can show suggestions', () => {
    const props = {
      suggestions: true,
      geocodeResult: { Error: null, Suggestions: [{}] }
    }
    const component = mount(<Location {...props} />)
    expect(component.find('.suggestions').length).toBe(1)
  })

  it('can set timeout function', () => {
    let called = false
    const w = {
      setTimeout: (fn, ms) => { called = true }
    }
    timeout(null, 0, w)
    expect(called).toBe(true)
  })

  it('timeout does nothing if window does not exist', () => {
    let called = false
    const w = null
    timeout(null, 0, w)
    expect(called).toBe(false)
  })
})
