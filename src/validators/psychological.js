import { allHaveStatus, anyHasStatus } from './helpers'

export default class PsychologicalValidator {
  constructor (state, props = {}) {
    this.completed = props.Completed
    this.psychological = props.Psychological
  }

  completionStatus (status) {
    let toCheck = ['Competence', 'Consultations', 'Hospitalizations', 'Diagnoses']

    if (showQuestion21E(this.psychological)) {
      toCheck.push('ExistingConditions')
    }

    if (allHaveStatus(this.completed)(toCheck, status, true)) {
      return 'complete'
    } else if (anyHasStatus(this.completed)(toCheck, status, false)) {
      return 'incomplete'
    }
    return 'neutral'
  }
}

const defaultPsychologicalState = {
  Competence: null,
  Consultation: null,
  Diagnoses: null,
  Hospitalization: null
}

/**
 * Determines if Question 21 E should be rendered. The following subsections must have branch values of No.
 *   - Competence
 *   - Consultations
 *   - Hospitalizations
 *   - Diagnoses
 */
export const showQuestion21E = (psychological = defaultPsychologicalState) => {
  const { Competence, Consultation, Diagnoses, Hospitalization } = psychological

  // We need values for everything before we can do anything
  if (!Competence || !Consultation || !Diagnoses || !Hospitalization) {
    return false
  }

  // We show question 21 if all other subsections have been marked with No
  return (Competence.IsIncompetent === 'No' &&
    Consultation.Consulted === 'No' &&
    Diagnoses.Diagnosed === 'No' &&
    Hospitalization.Hospitalized === 'No')
}

export const hideExistingConditions = (application = {}) => {
  return !showQuestion21E(application.Psychological)
}
