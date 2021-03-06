import TreatmentValidator from './treatment'
import DiagnosisValidator from './diagnosis'
import { validBranch } from './helpers'

export default class DiagnosesValidator {
  constructor (state = {}, props = {}) {
    this.diagnosed = state.Diagnosed
    this.didNotConsult = state.DidNotConsult
    this.inTreatment = state.InTreatment
    this.diagnosisList = state.DiagnosisList
    this.diagnosisListBranch = state.DiagnosisListBranch
    this.treatmentList = state.TreatmentList
    this.treatmentListBranch = state.TreatmentListBranch
  }

  validDiagnosisList () {
    if (this.diagnosed === 'No') {
      return true
    }

    if (this.diagnosed === 'Yes' && this.diagnosisList.length === 0) {
      return false
    }

    if (this.diagnosisListBranch !== 'No') {
      return false
    }

    for (let item of this.diagnosisList) {
      if (!new DiagnosisValidator(item.Diagnosis).isValid()) {
        return false
      }
    }

    return true
  }

  validTreatmentList () {
    if (this.inTreatment === 'No') {
      return true
    }

    if (this.inTreatment === 'Yes' && this.treatmentList.length === 0) {
      return false
    }

    if (this.treatmentListBranch !== 'No') {
      return false
    }

    for (let item of this.treatmentList) {
      if (!new TreatmentValidator(item.Treatment).isValid()) {
        return false
      }
    }

    return true
  }

  isValid () {
    if (!validBranch(this.diagnosed)) {
      return false
    }

    if (this.diagnosed === 'No') {
      return true
    }

    return validBranch(this.didNotConsult) &&
      validBranch(this.inTreatment) &&
      this.validDiagnosisList() &&
      this.validTreatmentList()
  }
}
