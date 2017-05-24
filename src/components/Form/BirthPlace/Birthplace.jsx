import React from 'react'
import { i18n } from '../../../config'
import { BirthPlaceValidator } from '../../../validators'
import ValidationElement from '../ValidationElement'
import Branch from '../Branch'
import Show from '../Show'
import DomesticBirthPlace from './Domestic'
import InternationalBirthPlace from './International'

export default class BirthPlace extends ValidationElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateBirthPlaceType = this.updateBirthPlaceType.bind(this)
    this.updateDomesticBirthPlace = this.updateDomesticBirthPlace.bind(this)
    this.updateInternationalBirthPlace = this.updateInternationalBirthPlace.bind(this)

    this.state = {
      errorCodes: []
    }
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    const codes = super.mergeError(this.state.errorCodes, error)
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  isValid () {
    return new BirthPlaceValidator(this.props, null).isValid()
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        city: this.props.city,
        county: this.props.county,
        state: this.props.state,
        country: this.props.country,
        domestic: this.props.domestic,
        ...updateValues
      })
    }
  }

  updateBirthPlaceType (values) {
    switch (values) {
      case 'Yes':
        this.update({
          domestic: values,
          country: 'United States'
        })
        break
      case 'No':
        this.update({
          domestic: values,
          state: '',
          county: '',
          country: ''
        })
        break
    }
  }

  updateDomesticBirthPlace (place) {
    this.update({
      city: place.city,
      state: place.state,
      county: place.county,
      country: 'United States',
      domestic: 'Yes'
    })
  }

  updateInternationalBirthPlace (place) {
    this.update({
      city: place.city,
      state: '',
      county: '',
      country: place.country,
      domestic: 'No'
    })
  }

  render () {
    const klass = `birthplace ${this.props.className || ''}`.trim()
    return (
      <div className={klass}>
        <Branch name="birthplace_type"
          help={this.props.help}
          value={this.props.domestic}
          label={this.props.label}
          onUpdate={this.updateBirthPlaceType}>
        </Branch>

        <Show when={this.props.domestic === 'Yes'}>
          <DomesticBirthPlace
            {...this.props}
            onValidate={this.handleValidation}
            onUpdate={this.updateDomesticBirthPlace}
          />
        </Show>
        <Show when={this.props.domestic === 'No'}>
          <InternationalBirthPlace
            {...this.props}
            onValidate={this.handleValidation}
            onUpdate={this.updateInternationalBirthPlace}
          />
        </Show>
      </div>
    )
  }
}

BirthPlace.defaultProps = {
  name: 'birthplace',
  label: i18n.t('identification.birthplace.question.label'),
  help: 'identification.birthplace.branch.help',
  branch: true,
  disabledCountry: false,
  disabledState: false,
  hideCounty: false
}
