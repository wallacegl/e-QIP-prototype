import ForeignBenefitValidator from './foreignbenefit'
import { validBranch } from './helpers'

export default class ForeignBenefitActivityValidator {
  constructor (state, props = {}) {
    this.hasBenefits = props.HasBenefits || ''
    this.list = props.List || []
    this.listBranch = props.ListBranch
  }

  isValid () {
    if (!validBranch(this.hasBenefits)) {
      return false
    }
    if (this.hasBenefits === 'No') {
      return true
    }

    if (this.hasBenefits === 'Yes' && !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    return this.list.every((item) => {
      return new ForeignBenefitValidator(null, item.Benefit).isValid()
    })
  }
}
