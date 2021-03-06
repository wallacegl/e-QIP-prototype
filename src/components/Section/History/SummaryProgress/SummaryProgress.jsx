import React from 'react'
import { newGuid } from '../../../Form/ValidationElement'
import { ValidationElement } from '../../../Form'
import { decimalAdjust, rangeSorter, julian, findPercentage, today, daysAgo, julianNow } from '../dateranges'

export default class SummaryProgress extends ValidationElement {
  total () {
    return parseInt(this.props.total || 10)
  }

  /**
   * Compile the ranges from the list of items
   */
  ranges () {
    let items = []
    if (this.props.List) {
      items = this.props.List() || []
    } else {
      console.warn('No List() function was provided for Summary Progress')
    }

    const julianMax = julian(daysAgo(today, 365 * this.total()))

    return items.sort(rangeSorter).map((dates) => {
      let left = 0
      let width = 0

      if (dates.from && dates.from.date && dates.to && dates.to.date) {
        const from = julian(dates.from.date)
        const to = julian(dates.to.date)

        if (dates.from.date >= julianMax || to >= julianMax) {
          // Meat of the calculations into percentages
          let right = findPercentage(julianNow, julianMax, to)
          left = findPercentage(julianNow, julianMax, from)
          width = Math.abs(right - left)

          // Check boundaries
          if (width < 0) {
            width = 0
          }

          if (width > 100) {
            width -= Math.abs(left)
          }

          if (left < 0) {
            left = 0
          }
        }
      }

      // Add the range to the collection
      return {
        left: left,
        width: decimalAdjust('round', width, -2),
        dates: dates
      }
    })
  }

  /**
   * Calculate the amount of units based on the sum of percentages
   * in compiled ranges.
   */
  completed () {
    const sum = this.ranges().reduce((a, b) => a + b.width, 0)
    return Math.min(decimalAdjust('floor', this.total() * (sum / 100), 0), this.total())
  }

  /**
   * Provide visualized timeline from compiled ranges
   */
  timeline () {
    // Loop through the collected ranges and output as elements
    //
    // Example: 10 years ago |----- Gap -----|----- Filled -----|----- Gap -----| Today
    // Imagine 10 years ago is 0% and today is 100%
    return this.ranges().map((range) => {
      const styles = {
        left: '' + range.left + '%',
        width: '' + range.width + '%'
      }
      return <div key={newGuid()} className="filled" style={styles}></div>
    })
  }

  render () {
    const klass = `summary-progress ${this.props.className || ''}`.trim()
    const completed = this.completed()
    const total = this.total()
    const klassFraction = `fraction ${completed === total ? 'covered' : ''}`.trim()

    return (
      <div className={klass}>
        <div className="content">
          <div>
            {this.props.children}
            <span className="title">{this.props.title}</span>
          </div>
          <div className="progress">
            {this.timeline()}
          </div>
        </div>
        <div className="stats">
          <div className={klassFraction}>
            <span className="completed">{completed}</span>
            <span className="slash">/</span>
            <span className="total">{total}</span>
          </div>
          <span className="unit">{this.props.unit}</span>
        </div>
      </div>
    )
  }
}
