package form

import "github.com/18F/e-QIP-prototype/api/geo"

// AddressField contains complete address information for an entity
type AddressField struct {
	Street  TextField
	Street2 TextField
	City    CityField
	State   StateField
	Zipcode ZipcodeField
	County  TextField
	Country CountryField
}

// Valid validates the location fields for an address
func (a AddressField) Valid() (bool, error) {

	var stack ErrorStack

	if ok, err := a.Street.Valid(); !ok {
		stack.Append("Address", err)
	}

	if ok, err := a.City.Valid(); !ok {
		stack.Append("City", err)
	}

	if ok, err := a.State.Valid(); !ok {
		stack.Append("State", err)
	}

	if ok, err := a.Country.Valid(); !ok {
		stack.Append("Country", err)
	}

	// Make sure non-geocoding validation checks are good
	if stack.HasErrors() {
		return false, stack
	}

	// Perform geocoding
	results, err := geo.Geocode.Validate(
		geo.Values{
			Street:  string(a.Street),
			Street2: string(a.Street2),
			City:    string(a.City),
			State:   string(a.State),
			Zipcode: string(a.Zipcode),
		})

	if err != nil {
		stack.Append("Address", ErrInvalidLocation{
			Message:     err.Error(),
			Suggestions: results,
		})
	}

	return !stack.HasErrors(), stack
}
