import React from 'react'
import { LoginOAuth, TwoFactor } from '../../components'
import { connect } from 'react-redux'
import { i18n } from '../../config'
import { login } from '../../actions/AuthActions'
import { push } from '../../middleware/history'
import { Text, Show } from '../../components/Form'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: this.props.authenticated,
      twofactor: this.props.twofactor,
      username: this.props.username,
      password: this.props.password
    }

    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount () {
    this.redirect()
  }

  componentWillMount () {
    this.redirect()
  }

  redirect () {
    // If user is authenticated, redirect to home page
    if (this.props.authenticated && this.props.twofactor) {
      this.props.dispatch(push('/form/identification/name'))
    }
  }

  onUsernameChange (e) {
    this.setState({username: e.target.value})
  }

  onPasswordChange (e) {
    this.setState({password: e.target.value})
  }

  login (event) {
    event.preventDefault()
    this.props.dispatch(login(this.state.username, this.state.password))
  }

  errorMessage () {
    if (!this.props.error) {
      return ''
    }

    return (
      <div className="eapp-error-message message">
        <i className="fa fa-exclamation"></i>
        {this.props.error}
      </div>
    )
  }

  loginForm () {
    const authValid = this.props.error === undefined || this.props.error === ''
    let pwClass = 'help'
    if (!authValid) {
      pwClass += ' usa-input-error'
    }

    return (
      <div>
        <div id="info" className="login-info usa-width-one-whole">
          <h2>{i18n.t('login.title')}</h2>
          <p>{i18n.t('login.para')}</p>
        </div>

        <div id="basic" className="login-basic usa-width-one-whole">
          <form onSubmit={this.login}>
            <div>
              <Text name="user"
                    placeholder="Enter your username"
                    label="Username"
                    autoFocus
                    value={this.state.username}
                    onChange={this.onUsernameChange} />
            </div>
            <div className={pwClass}>
              <label
                htmlFor="password">
                Password
              </label>
              <input id="password"
                     name="password"
                     type="password"
                     placeholder={i18n.t('login.placeholder.password')}
                     value={this.state.password}
                     onChange={this.onPasswordChange} />
              {this.errorMessage()}
            </div>
            <div>
              <button type="submit">{i18n.t('login.submit')}</button>
              <a id="forgot-password" href="#" title={i18n.t('login.forgot.title')}>{i18n.t('login.forgot.text')}</a>
            </div>
          </form>
        </div>

        <Show when={this.props.oauth}>
          <div id="oauth" className="login-oauth usa-width-one-whole">
            <span>Sign in with</span>
            <LoginOAuth authenticated={this.state.authenticated}>
              <i className="fa fa-github" aria-hidden="true"></i>
            </LoginOAuth>
          </div>
        </Show>
      </div>
    )
  }

  twofactorForm () {
    return (
      <div>
        <div id="info" className="login-info usa-width-one-whole">
          <h2>{i18n.t('login.twofactor.title')}</h2>
          <p>{i18n.t('login.twofactor.para')}</p>
          <ul>
            <li><a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en">Download Google authenticator for Android</a></li>
            <li><a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8">Download Google authenticator for iOS</a></li>
          </ul>
        </div>
        <div id="twofactor" className="login-twofactor usa-width-one-whole">
          <TwoFactor username={this.state.username} />
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="login eapp-core" id="login">
        <div id="seal-header" className="seal-header text-center">
          <div className="content">
            <img src="/img/US-OfficeOfPersonnelManagement-Seal.svg" alt="U.S. Office of Personnel Management" />
            <h2>Welcome to the Questionnaire for National Security Positions</h2>
          </div>
        </div>
        <div className="content">
          {this.props.authenticated && !this.props.twofactor && this.twofactorForm()}
          {!this.props.authenticated && !this.props.twofactor && this.loginForm()}
        </div>
      </div>
    )
  }
}

Login.defaultProps = {
  oauth: false,
  authenticated: false,
  twofactor: false,
  username: '',
  password: ''
}

/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 */
function mapStateToProps (state) {
  const auth = state.authentication
  return {
    authenticated: auth.authenticated,
    twofactor: auth.twofactor,
    token: auth.token,
    error: auth.error
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(Login)
