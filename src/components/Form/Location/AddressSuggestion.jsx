import React from 'react'

/**
 * Helper component that renders address information found
 */
export function AddressSuggestion (props) {
  const suggestion = props.suggestion
  const current = props.current
  return (
    <div className="address-suggestion">
      <div>
        <HighlightedField new={ suggestion.Street } current={current.street} />
      </div>
      <div>
        <HighlightedField new={ suggestion.Street2 } current={current.street2} />
      </div>
      <div>
        <HighlightedField new={ suggestion.City } current={current.city} />, <HighlightedField new={ suggestion.State } current={current.state} /> <HighlightedField new={ suggestion.Zipcode } current={current.zipcode} />
      </div>
    </div>
  )
}

/**
 * Compares a current and new value and adds a class in order to allow
 * values to be highlighted when there's a mismatch
 */
export function HighlightedField (props) {
  let updated = props.new || ''
  let current = props.current || ''
  if (updated.toUpperCase() !== current.toUpperCase()) {
    return (
      <span className="highlight">{ updated }</span>
    )
  }
  return (<span>{ props.current }</span>)
}
