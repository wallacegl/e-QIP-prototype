import React from 'react'
import LocationValidator from '../../../../validators/location'
import SubsectionElement from '../../SubsectionElement'
import { Location, Field } from '../../../Form'
import { i18n } from '../../../../config'

export default class ApplicantBirthPlace extends SubsectionElement {
  render () {
    const klass = `applicant-birthplace ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Field>
          <Location name="birthplace"
            layout={Location.BIRTHPLACE}
            label={i18n.t('identification.birthplace.label.location')}
            stateLabel={i18n.t('identification.birthplace.label.state')}
            statePlaceholder={i18n.t('identification.birthplace.placeholder.state')}
            cityLabel={i18n.t('identification.birthplace.label.city')}
            cityPlaceholder={i18n.t('identification.birthplace.placeholder.city')}
            countyLabel={i18n.t('identification.birthplace.label.county')}
            countyPlaceholder={i18n.t('identification.birthplace.placeholder.county')}
            countryLabel={i18n.t('identification.birthplace.label.country')}
            countryPlaceholder={i18n.t('identification.birthplace.placeholder.country')}
            {...this.props.value}
            onUpdate={this.props.onUpdate}
            onError={this.props.onError}
          />
        </Field>
      </div>
    )
  }
}

ApplicantBirthPlace.defaultProps = {
  value: {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'birthplace',
  dispatch: () => {},
  validator: (state, props) => {
    return new LocationValidator(props.value, props).isValid()
  }
}

ApplicantBirthPlace.errors = []
