import React from 'react'
import { mount } from 'enzyme'
import OtherOffenses from './OtherOffenses'
import Location from '../../../Form/Location'

describe('The offense component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'offense',
      HasOtherOffenses: 'No'
    }
    const component = mount(<OtherOffenses {...expected} />)
    expect(component.find('.accordion').length).toBe(0)
  })

  it('selects yes', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      onUpdate: () => { updates++ }
    }
    const component = mount(<OtherOffenses {...expected} />)
    component.find('.has-otheroffenses .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('clears list', () => {
    let updates = 0
    const expected = {
      name: 'offense',
      onUpdate: (values) => {
        if (values.List.length === 0) {
          updates++
        }
      },
      List: [{Item: {}}]
    }
    const component = mount(<OtherOffenses {...expected} />)
    component.find('.has-otheroffenses .no input').simulate('change')
    expect(updates).toBe(1)
  })

  it('populates all fields', () => {
    const expected = {
      name: 'offense',
      HasOtherOffenses: 'Yes',
      ListBranch: 'No',
      List: [
        {
          Item: {
            Date: {
              day: '1',
              month: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            Description: {
              value: 'Some description'
            },
            InvolvedViolence: 'No',
            InvolvedFirearms: 'Yes',
            InvolvedSubstances: 'No',
            CourtType: 'Felony',
            CourtAddress: {
              country: 'United States',
              street: '1234 Some Rd',
              city: 'Arlington',
              state: 'Virginia',
              zipcode: '22202',
              layout: Location.ADDRESS
            },
            CourtDate: {
              day: '1',
              month: '1',
              year: '2016',
              date: new Date('1/1/2016')
            },
            CourtName: {
              value: 'court name'
            },
            CourtCharge: {
              value: 'Some charge'
            },
            CourtOutcome: {
              value: 'Some outcome'
            },
            WasSentenced: 'Yes',
            Sentence: {
              AwaitingTrial: 'Yes',
              AwaitingTrialExplanation: 'Yes',
              ExceedsYear: 'Yes',
              Incarcerated: 'Yes',
              IncarcerationDates: {
                from: {
                  date: new Date('1/1/2000')
                },
                to: {
                  date: new Date('1/1/2004')
                },
                present: false
              },
              ProbationDates: {
                from: {
                  date: new Date('1/1/2000')
                },
                to: {
                  date: new Date('1/1/2004')
                },
                present: false
              },
              Description: {
                value: 'Foo'
              }
            }
          }
        }
      ]
    }
    const component = mount(<OtherOffenses {...expected} />)
    expect(component.find('.accordion').length).toBe(1)
  })
})
