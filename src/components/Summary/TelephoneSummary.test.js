import React from 'react'
import { mount } from 'enzyme'
import { TelephoneSummary } from './TelephoneSummary'

describe('The telephone summary', () => {
  it('display unknown if no props', () => {
    const summary = TelephoneSummary(null, 'Unknown')
    expect(summary).toEqual('Unknown')
  })

  it('display DSN format', () => {
    const phone = {
      Telephone: {
        type: 'DSN',
        number: '8675309'
      }
    }
    const summary = TelephoneSummary(phone, 'Unknown')
    expect(summary).toEqual(<span className="title-case">867-5309</span>)
  })

  it('display international format', () => {
    const phone = {
      Telephone: {
        type: 'International',
        number: '0011234567890',
        extension: '1234'
      }
    }
    const summary = TelephoneSummary(phone, 'Unknown')
    expect(summary).toEqual(<span className="title-case">+001 1234567890 x1234</span>)
  })

  it('display domestic format', () => {
    const phone = {
      Telephone: {
        type: 'Domestic',
        number: '2028675309',
        extension: '1234'
      }
    }
    const summary = TelephoneSummary(phone, 'Unknown')
    expect(summary).toEqual(<span className="title-case">(202) 867-5309 x1234</span>)
  })

  it('displays unknown if empty object', () => {
    const phone = {}
    const summary = TelephoneSummary(phone, 'Unknown')
    expect(summary).toEqual('Unknown')
  })
})
