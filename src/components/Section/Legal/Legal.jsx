import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { IntroHeader, Field } from '../../Form'
import Offenses from './Police/Offenses'
import OtherOffenses from './Police/OtherOffenses'
import DomesticViolenceList from './Police/DomesticViolenceList'
import { History, Revoked, Debarred } from './Investigations'
import { Unauthorized, Manipulating, Unlawful } from './Technology'

class Legal extends SectionElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.updatePolice = this.updatePolice.bind(this)
    this.updatePoliceOffenses = this.updatePoliceOffenses.bind(this)
    this.updatePoliceOtherOffenses = this.updatePoliceOtherOffenses.bind(this)
    this.updatePoliceDomesticViolence = this.updatePoliceDomesticViolence.bind(this)
    this.updateHistory = this.updateHistory.bind(this)
    this.updateRevoked = this.updateRevoked.bind(this)
    this.updateDebarred = this.updateDebarred.bind(this)
    this.updateUnauthorized = this.updateUnauthorized.bind(this)
    this.updateManipulating = this.updateManipulating.bind(this)
    this.updateUnlawful = this.updateUnlawful.bind(this)
  }

  updatePolice (values) {
    this.handleUpdate('Police', values)
  }

  updatePoliceOffenses (values) {
    this.handleUpdate('PoliceOffenses', values)
  }

  updatePoliceOtherOffenses (values) {
    this.handleUpdate('PoliceOtherOffenses', values)
  }

  updatePoliceDomesticViolence (values) {
    this.handleUpdate('PoliceDomesticViolence', values)
  }

  updateHistory (values) {
    this.handleUpdate('History', values)
  }

  updateRevoked (values) {
    this.handleUpdate('Revoked', values)
  }

  updateDebarred (values) {
    this.handleUpdate('Debarred', values)
  }

  updateUnauthorized (values) {
    this.handleUpdate('Unauthorized', values)
  }

  updateManipulating (values) {
    this.handleUpdate('Manipulating', values)
  }

  updateUnlawful (values) {
    this.handleUpdate('Unlawful', values)
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="legal intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader errors={() => { return this.props.Errors.some(x => x.valid === false) }}
                             completed={() => { return this.props.Completed.length === 3 && this.props.Completed.every(x => x.valid === true) }}
                             onTour={this.handleTour}
                             onReview={this.handleReview}
                             />
              </div>
            </div>
          </SectionView>

          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop="true"
                       back="legal/investigations/history"
                       backLabel={i18n.t('legal.destination.investigations.history')}
                       next="psychological/intro"
                       nextLabel={i18n.t('psychological.destination.psychological')}>
            <Field title={i18n.t('legal.police.heading.title')}
                   titleSize="h2">
              {i18n.m('legal.police.para.intro1')}
              {i18n.m('legal.police.para.intro2')}
              {i18n.m('legal.police.para.intro3')}
            </Field>

            <Offenses name="offenses"
                      {...this.props.PoliceOffenses}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updatePoliceOffenses}
                      onError={this.handleError}
                      />

            <hr/>
            <OtherOffenses name="otheroffenses"
                           {...this.props.PoliceOtherOffenses}
                           defaultState={false}
                           dispatch={this.props.dispatch}
                           onUpdate={this.updatePoliceOtherOffenses}
                           onError={this.handleError}
                           />

            <hr/>
            <DomesticViolenceList name="domesticviolence"
                                  {...this.props.PoliceDomesticViolence}
                                  dispatch={this.props.dispatch}
                                  onUpdate={this.updatePoliceDomesticViolence}
                                  onError={this.handleError}
                                  />

            <hr/>
            <History name="history"
                     {...this.props.History}
                     defaultState={false}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateInvestigationsHistory}
                     onError={this.handleError}
                     />

            <hr/>
            <Revoked name="revoked"
                     {...this.props.Revoked}
                     defaultState={false}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateRevoked}
                     onError={this.handleError}
                     />

            <hr/>
            <Debarred name="debarred"
                      {...this.props.Debarred}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateDebarred}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="police"
                       back="foreign/business/conferences"
                       backLabel={i18n.t('foreign.destination.business.events')}
                       next="legal/police/offenses"
                       nextLabel={i18n.t('legal.destination.offenses')}>
            <h2>{i18n.t('legal.police.heading.title')}</h2>
            {i18n.m('legal.police.para.intro1')}
            {i18n.m('legal.police.para.intro2')}
            {i18n.m('legal.police.para.intro3')}
          </SectionView>

          <SectionView name="police/offenses"
                       back="legal/police"
                       backLabel={i18n.t('legal.destination.police')}
                       next="legal/police/additionaloffenses"
                       nextLabel={i18n.t('legal.destination.additionalOffenses')}>
            <Offenses name="offenses"
                      {...this.props.PoliceOffenses}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updatePoliceOffenses}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="police/additionaloffenses"
                       back="legal/police/offenses"
                       backLabel={i18n.t('legal.destination.offenses')}
                       next="legal/police/domesticviolence"
                       nextLabel={i18n.t('legal.destination.domesticViolence')}>
            <OtherOffenses name="otheroffenses"
                           {...this.props.PoliceOtherOffenses}
                           dispatch={this.props.dispatch}
                           onUpdate={this.updatePoliceOtherOffenses}
                           onError={this.handleError}
                           />
          </SectionView>

          <SectionView name="police/domesticviolence"
                       back="legal/police/additionaloffenses"
                       backLabel={i18n.t('legal.destination.additionalOffenses')}
                       next="legal/investigations/history"
                       nextLabel={i18n.t('legal.destination.investigations.history')}>
            <DomesticViolenceList name="domesticviolence"
                                  {...this.props.PoliceDomesticViolence}
                                  dispatch={this.props.dispatch}
                                  onUpdate={this.updatePoliceDomesticViolence}
                                  onError={this.handleError}
                                  />
          </SectionView>

          <SectionView name="investigations"
                       back="legal/police/domesticviolence"
                       backLabel={i18n.t('legal.destination.domesticViolence')}
                       next="legal/investigations/revoked"
                       nextLabel={i18n.t('legal.destination.investigations.revoked')}>
            <History name="history"
                     {...this.props.History}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateHistory}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="investigations/history"
                       back="legal/police/domesticviolence"
                       backLabel={i18n.t('legal.destination.domesticViolence')}
                       next="legal/investigations/revoked"
                       nextLabel={i18n.t('legal.destination.investigations.revoked')}>
            <History name="history"
                     {...this.props.History}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateHistory}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="investigations/revoked"
                       back="legal/investigations/history"
                       backLabel={i18n.t('legal.destination.investigations.history')}
                       next="legal/investigations/debarred"
                       nextLabel={i18n.t('legal.destination.investigations.debarred')}>
            <Revoked name="revoked"
                     {...this.props.Revoked}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateRevoked}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="investigations/debarred"
                       back="legal/investigations/revoked"
                       backLabel={i18n.t('legal.destination.investigations.revoked')}
                       next="legal/financial"
                       nextLabel={i18n.t('legal.destination.financial')}>
            <Debarred name="debarred"
                      {...this.props.Debarred}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateDebarred}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="technology/unauthorized"
                       back="legal/financial"
                       backLabel={i18n.t('legal.destination.financial')}
                       next="legal/technology/manipulating"
                       nextLabel={i18n.t('legal.destination.technology.manipulating')}>
            <Unauthorized name="unauthorized"
                          {...this.props.Unauthorized}
                          dispatch={this.props.dispatch}
                          onUpdate={this.updateUnauthorized}
                          onError={this.handleError}
                          />
          </SectionView>

          <SectionView name="technology/manipulating"
                       back="legal/technology/unauthorized"
                       backLabel={i18n.t('legal.destination.technology.unauthorized')}
                       next="legal/technology/unlawful"
                       nextLabel={i18n.t('legal.destination.technology.unlawful')}>
            <Manipulating name="manipulating"
                          {...this.props.Manipulating}
                          dispatch={this.props.dispatch}
                          onUpdate={this.updateManipulating}
                          onError={this.handleError}
                          />
          </SectionView>

          <SectionView name="technology/unlawful"
                       back="legal/technology/manipulating"
                       backLabel={i18n.t('legal.destination.technology.manipulating')}
                       next="legal/associations"
                       nextLabel={i18n.t('legal.destination.associations')}>
            <Unlawful name="unlawful"
                      {...this.props.Unlawful}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateUnlawful}
                      onError={this.handleError}
                      />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let legal = app.Legal || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Legal: legal,
    Police: legal.Police || {},
    PoliceOffenses: legal.PoliceOffenses || {},
    PoliceOtherOffenses: legal.PoliceOtherOffenses || {},
    PoliceDomesticViolence: legal.PoliceDomesticViolence || {},
    History: legal.History || {},
    Revoked: legal.Revoked || {},
    Debarred: legal.Debarred || {},
    Unauthorized: legal.Unauthorized || {},
    Manipulating: legal.Manipulating || {},
    Unlawful: legal.Unlawful || {},
    Errors: errors.legal || [],
    Completed: completed.legal || []
  }
}

Legal.defaultProps = {
  defaultView: 'police',
  store: 'Legal'
}

export default connect(mapStateToProps)(AuthenticatedView(Legal))
