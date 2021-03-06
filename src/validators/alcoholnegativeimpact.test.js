import NegativeImpactsValidator, { NegativeImpactValidator } from './alcoholnegativeimpact'

describe('negative impact component validation', function () {
  it('can validate negative impact', () => {
    const tests = [
      {
        state: {
          Occurred: {
            month: '1',
            year: '2010'
          },
          Circumstances: {
            value: 'Foo'
          },
          NegativeImpact: {
            value: 'Bar'
          },
          Used: {
            from: {
              date: new Date('1/1/2010')
            },
            to: {
              date: new Date('1/1/2012')
            },
            present: false
          }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new NegativeImpactValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })

  it('can validate list of negative impacts', () => {
    const tests = [
      {
        state: {
          HasImpacts: 'No'
        },
        expected: true
      },
      {
        state: {
          HasImpacts: 'Yes',
          List: []
        },
        expected: false
      },
      {
        state: {
          HasImpacts: 'Yes',
          ListBranch: 'Nope',
          List: [{}]
        },
        expected: false
      },
      {
        state: {
          HasImpacts: 'Yes',
          ListBranch: 'No',
          List: [{
            NegativeImpact: {
              Occurred: {
                month: '1',
                year: '2010'
              },
              Circumstances: {
                value: 'Foo'
              },
              NegativeImpact: {
                value: 'Bar'
              },
              Used: {
                from: {
                  date: new Date('1/1/2010')
                },
                to: {
                  date: new Date('1/1/2012')
                },
                present: false
              }
            }
          }]
        },
        expected: true
      },
      {
        state: {
          HasImpacts: 'Yes',
          ListBranch: 'No',
          List: [{
            NegativeImpact: {
              Occurred: {
                month: '1',
                year: '2010'
              },
              Circumstances: {},
              NegativeImpact: {
                value: 'Bar'
              },
              Used: {
                from: {
                  date: new Date('1/1/2010')
                },
                to: {
                  date: new Date('1/1/2012')
                },
                present: false
              }
            }
          }]
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new NegativeImpactsValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
