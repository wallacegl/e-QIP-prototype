import ConsultationValidator from './consultation'
import Location from '../components/Form/Location'

describe('Consultation validation', function () {
  it('validates competence', () => {
    const tests = [
      {
        state: {
          Consulted: 'Yes',
          List: [
            {
              Consultation: {
                CourtName: {
                  value: 'Circuit Court'
                },
                CourtAddress: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                Disposition: {
                  value: 'Stuff'
                },
                Occurred: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Appeals: [{ Has: 'No' }]
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          List: [],
          Consulted: 'Yes',
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          List: [],
          Consulted: 'No',
          ListBranch: 'No'
        },
        expected: true
      },
      {
        state: {
          List: [],
          Consulted: 'Nope',
          ListBranch: 'No'
        },
        expected: false
      },
      {
        state: {
          Consulted: 'Yes',
          List: [
            {
              Consultation: {
                CourtName: null,
                CourtAddress: {
                  country: 'United States',
                  street: '1234 Some Rd',
                  city: 'Arlington',
                  state: 'Virginia',
                  zipcode: '22202',
                  layout: Location.ADDRESS
                },
                Disposition: {
                  value: 'Stuff'
                },
                Occurred: {
                  day: '1',
                  month: '1',
                  year: '2016',
                  date: new Date('1/1/2016')
                },
                Appeals: [{ Has: 'No' }]
              }
            }
          ],
          ListBranch: 'No'
        },
        expected: false
      }
    ]
    tests.forEach(test => {
      expect(new ConsultationValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
