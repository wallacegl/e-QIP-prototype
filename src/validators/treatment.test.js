import TreatmentValidator from './treatment'
import Location from '../components/Form/Location'

describe('Treatment validation', function () {
  it('validates treatment', () => {
    const tests = [
      {
        state: {
          Name: {
            value: 'Circuit Court'
          },
          Address: {
            country: 'United States',
            street: '1234 Some Rd',
            city: 'Arlington',
            state: 'Virginia',
            zipcode: '22202',
            layout: Location.ADDRESS
          },
          Phone: {
            noNumber: '',
            number: '7031112222',
            numberType: 'Home',
            timeOfDay: 'Both',
            extension: ''
          }
        },
        expected: true
      }
    ]
    tests.forEach(test => {
      expect(new TreatmentValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
