import React from 'react'
import { mount } from 'enzyme'
import { ResidenceCustomSummary, EmploymentCustomSummary, EducationCustomSummary, InjectGaps,
         ResidenceCaption, EmploymentCaption, EducationCaption } from './summaries'
import Location from '../../Form/Location'

describe('The summary components', () => {
  it('can display residence summary', () => {
    const expected = {
      item: {
        Item: {
          Address: {
            country: 'United States',
            street: '742 Evergreen Terrace',
            city: 'Springfield',
            state: 'Nevada',
            zip: '123456',
            layout: Location.ADDRESS
          },
          Dates: {
            from: {
              date: new Date(1989, 12, 17)
            },
            to: {
              date: new Date()
            }
          }
        }
      },
      index: 0,
      initial: false,
      callback: () => {},
      toggle: () => {},
      openText: () => {},
      remove: () => {},
      byline: () => {}
    }

    const component = mount(ResidenceCustomSummary(
      expected.item,
      expected.index,
      expected.initial,
      expected.callback,
      expected.toggle,
      expected.openText,
      expected.remove,
      expected.byline))
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.employer').length).toEqual(1)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can display employment summary', () => {
    const expected = {
      item: {
        Item: {
          Employment: {
            value: 'Springfield Nuclear Power Plant'
          },
          Dates: {
            from: {
              date: new Date(1989, 12, 17)
            },
            to: {
              date: new Date()
            }
          }
        }
      },
      index: 0,
      initial: false,
      callback: () => {},
      toggle: () => {},
      openText: () => {},
      remove: () => {},
      byline: () => {}
    }

    const component = mount(EmploymentCustomSummary(
      expected.item,
      expected.index,
      expected.initial,
      expected.callback,
      expected.toggle,
      expected.openText,
      expected.remove,
      expected.byline))
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.employer').length).toEqual(1)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can display education summary', () => {
    const expected = {
      item: {
        Item: {
          Name: {
            value: 'Springfield Elementary School'
          },
          Dates: {
            from: {
              date: new Date(1989, 12, 17)
            },
            to: {
              date: new Date()
            }
          }
        }
      },
      index: 0,
      initial: false,
      callback: () => {},
      toggle: () => {},
      openText: () => {},
      remove: () => {},
      byline: () => {}
    }

    const component = mount(EducationCustomSummary(
      expected.item,
      expected.index,
      expected.initial,
      expected.callback,
      expected.toggle,
      expected.openText,
      expected.remove,
      expected.byline))
    expect(component.find('.index').length).toEqual(1)
    expect(component.find('.employer').length).toEqual(1)
    expect(component.find('.dates').length).toEqual(1)
  })

  it('can inject gaps', () => {
    const list = [
      {
        type: 'Residence',
        Item: {
          Dates: {
            from: {
              date: new Date(new Date().getFullYear() - 5, 12, 17)
            },
            to: {
              date: new Date()
            }
          }
        }
      },
      {
        type: 'Residence',
        Item: {
          Dates: {
            from: {
              date: new Date(new Date().getFullYear() - 11, 12, 17)
            },
            to: {
              date: new Date(new Date().getFullYear() - 9, 12, 17)
            }
          }
        }
      },
      {
        type: 'Employment',
        Item: {
          Dates: {
            from: {
              date: new Date(new Date().getFullYear() - 5, 12, 17)
            },
            to: {
              date: new Date()
            }
          }
        }
      },
      {
        type: 'Gap',
        Item: {
          Dates: {
            from: {
              date: new Date(new Date().getFullYear() - 10, 12, 17)
            },
            to: {
              date: new Date(new Date().getFullYear() - 5, 12, 17)
            }
          }
        }
      }
    ]
    const residence = InjectGaps(list.filter(x => x.type === 'Residence' || x.type === 'Gap'))
    const employment = InjectGaps(list.filter(x => x.type === 'Employment' || x.type === 'Gap'))
    expect(residence.filter(item => item.type === 'Residence').length).toEqual(2)
    expect(residence.filter(item => item.type === 'Gap').length).toEqual(1)
    expect(employment.filter(item => item.type === 'Employment').length).toEqual(1)
    expect(employment.filter(item => item.type === 'Gap').length).toEqual(1)
  })

  it('can render captions', () => {
    const tests = [
      {
        component: mount(<ResidenceCaption />),
        src: '/img/residence-house.svg'
      },
      {
        component: mount(<EmploymentCaption />),
        src: '/img/employer-briefcase.svg'
      },
      {
        component: mount(<EducationCaption />),
        src: '/img/school-cap.svg'
      }
    ]

    tests.forEach(test => {
      expect(test.component.find('img').node.src).toBe(test.src)
    })
  })
})
