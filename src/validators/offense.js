import LocationValidator from './location'
import SentenceValidator from './sentence'
import { validGenericTextfield, validDateField, validBranch } from './helpers'

export default class OffenseValidator {
  constructor (state = {}, props = {}) {
    this.date = state.Date
    this.description = state.Description
    this.involvedViolence = state.InvolvedViolence
    this.involvedFirearms = state.InvolvedFirearms
    this.involvedSubstances = state.InvolvedSubstances
    this.address = state.Address
    this.wasCited = state.WasCited
    this.citedBy = state.CitedBy
    this.agencyAddress = state.AgencyAddress
    this.wasCharged = state.WasCharged
    this.explanation = state.Explanation
    this.courtName = state.CourtName
    this.courtAddress = state.CourtAddress
    this.chargeType = state.ChargeType
    this.courtCharge = state.CourtCharge
    this.courtOutcome = state.CourtOutcome
    this.courtDate = state.CourtDate
    this.sentence = state.Sentence
    this.wasSentenced = state.WasSentenced
    this.awaitingTrial = state.AwaitingTrial
    this.awaitingTrialExplanation = state.AwaitingTrialExplanation
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  validViolence () {
    return this.involvedViolence === 'Yes' || this.involvedViolence === 'No'
  }

  validFirearms () {
    return this.involvedFirearms === 'Yes' || this.involvedFirearms === 'No'
  }

  validSubstances () {
    return this.involvedSubstances === 'Yes' || this.involvedSubstances === 'No'
  }

  validAddress () {
    return !!this.address && new LocationValidator(this.address).isValid()
  }

  validCited () {
    return this.wasCited === 'Yes' || this.wasCited === 'No'
  }

  validCitedBy () {
    if (this.wasCited === 'No') {
      return true
    }

    return !!this.citedBy && validGenericTextfield(this.citedBy)
  }

  validAgencyAddress () {
    if (this.wasCited === 'No') {
      return true
    }

    return !!this.agencyAddress && new LocationValidator(this.agencyAddress).isValid()
  }

  validCharged () {
    if (this.wasCited === 'No') {
      return true
    }

    return this.wasCharged === 'Yes' || this.wasCharged === 'No'
  }

  validExplanation () {
    if (this.wasCited === 'No' || this.wasCharged !== 'No') {
      return true
    }

    return !!this.explanation && validGenericTextfield(this.explanation)
  }

  validCourtName () {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return !!this.courtName && validGenericTextfield(this.courtName)
  }

  validCourtAddress () {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return !!this.courtAddress && new LocationValidator(this.courtAddress).isValid()
  }

  validChargeType () {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return !!this.chargeType && ['Felony', 'Misdemeanor', 'Other'].includes(this.chargeType)
  }

  validCourtCharge () {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return !!this.courtCharge && validGenericTextfield(this.courtCharge)
  }

  validCourtOutcome () {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return !!this.courtOutcome && validGenericTextfield(this.courtOutcome)
  }

  validCourtDate () {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    return !!this.courtDate && validDateField(this.courtDate)
  }

  validSentenced () {
    if (this.wasCited === 'No' || this.wasCharged !== 'Yes') {
      return true
    }

    if (this.wasSentenced === 'No') {
      return true
    }

    if (this.wasSentenced === 'Yes') {
      return new SentenceValidator(this.sentence, null).isValid()
    }

    return false
  }

  validAwaitingTrial () {
    if (this.wasCharged === 'Yes' && this.wasCited === 'Yes' && this.wasSentenced === 'No') {
      return validBranch(this.awaitingTrial) &&
        validGenericTextfield(this.awaitingTrialExplanation)
    }
    return true
  }

  isValid () {
    return this.validDate() &&
      this.validDescription() &&
      this.validViolence() &&
      this.validFirearms() &&
      this.validSubstances() &&
      this.validAddress() &&
      this.validCited() &&
      this.validCitedBy() &&
      this.validAgencyAddress() &&
      this.validCharged() &&
      this.validExplanation() &&
      this.validCourtName() &&
      this.validCourtAddress() &&
      this.validChargeType() &&
      this.validCourtCharge() &&
      this.validCourtOutcome() &&
      this.validCourtDate() &&
      this.validSentenced() &&
      this.validAwaitingTrial()
  }
}
