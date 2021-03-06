import ForeignBusinessConferencesValidator, { ConferencesValidator } from './foreignbusinessconferences'
import { battery } from './helpers'

describe('Foreign business conferences component validation', function () {
  it('validate foreign business conferences description', () => {
    const tests = [
      {
        state: {
          Description: {}
        },
        expected: false
      },
      {
        state: {
          Description: {
            value: 'this is the description'
          }
        },
        expected: true
      }
    ]

    battery(tests, ConferencesValidator, 'validDescription')
  })

  it('validate foreign business conferences sponsor', () => {
    const tests = [
      {
        state: {
          Sponsor: {}
        },
        expected: false
      },
      {
        state: {
          Sponsor: {
            value: 'this is the sponsor'
          }
        },
        expected: true
      }
    ]

    battery(tests, ConferencesValidator, 'validSponsor')
  })

  it('validate foreign business conferences city', () => {
    const tests = [
      {
        state: {
          City: {}
        },
        expected: false
      },
      {
        state: {
          City: {
            value: 'this is the city'
          }
        },
        expected: true
      }
    ]

    battery(tests, ConferencesValidator, 'validCity')
  })

  it('validate foreign business conferences country', () => {
    const tests = [
      {
        state: {
        },
        expected: false
      },
      {
        state: {
          Country: {}
        },
        expected: false
      },
      {
        state: {
          Country: {
            value: 'Germany'
          }
        },
        expected: true
      }
    ]

    battery(tests, ConferencesValidator, 'validCountry')
  })

  it('validate foreign business conferences date range', () => {
    const tests = [
      {
        state: {
          Dates: {}
        },
        expected: false
      },
      {
        state: {
          Dates: {
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

    battery(tests, ConferencesValidator, 'validDates')
  })

  it('validate foreign business conferences purpose', () => {
    const tests = [
      {
        state: {
          Purpose: {}
        },
        expected: false
      },
      {
        state: {
          Purpose: {
            value: 'this is the purpose'
          }
        },
        expected: true
      }
    ]

    battery(tests, ConferencesValidator, 'validPurpose')
  })

  it('validate foreign business conferences contacts', () => {
    const tests = [
      {
        state: {
          Contacts: null
        },
        expected: false
      },
      {
        state: {
          Contacts: {}
        },
        expected: false
      },
      {
        state: {
          Contacts: {
            List: [
              {
                Has: 'No'
              }
            ]
          }
        },
        expected: true
      },
      {
        state: {
          Contacts: {
            List: [
              {
                Has: 'Yes'
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          Contacts: {
            List: [
              {
                Has: 'Yes',
                Explanation: {}
              }
            ]
          }
        },
        expected: false
      },
      {
        state: {
          Contacts: {
            List: [
              {
                Has: 'Yes',
                Explanation: {
                  value: 'This is the explanation'
                }
              }
            ]
          }
        },
        expected: true
      }
    ]

    battery(tests, ConferencesValidator, 'validContacts')
  })

  it('validate foreign business conferences', () => {
    const tests = [
      {
        state: {},
        expected: false
      },
      {
        state: {
          HasForeignConferences: 'No'
        },
        expected: true
      },
      {
        state: {
          HasForeignConferences: 'Yes',
          List: [],
          ListBranch: ''
        },
        expected: false
      },
      {
        state: {
          HasForeignConferences: 'Yes',
          List: [
            {
              Description: {
                value: 'this is the description'
              },
              Sponsor: {
                value: 'this is the sponsor'
              },
              City: {
                value: 'this is the city'
              },
              Country: {
                value: 'Germany'
              },
              Dates: {
                from: {
                  date: new Date('1/1/2010')
                },
                to: {
                  date: new Date('1/1/2012')
                },
                present: false
              },
              Purpose: {
                value: 'this is the purpose'
              },
              Contacts: {
                List: [
                  {
                    Has: 'No'
                  }
                ]
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      }
    ]

    battery(tests, ForeignBusinessConferencesValidator, 'isValid')
  })
})
