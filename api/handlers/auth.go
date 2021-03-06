package handlers

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/facebook"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
	"golang.org/x/oauth2/linkedin"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/gorilla/mux"
)

var (
	oauthStateString = "random"
	redirectTo       = os.Getenv("API_REDIRECT")
)

// AuthServiceHandler is the initial entry point for authentication.
func AuthServiceHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	service := vars["service"]

	config, ok := configureAuthentication(service)
	if !ok {
		http.Redirect(w, r, redirectTo, http.StatusTemporaryRedirect)
	}

	http.Redirect(w, r, config.AuthCodeURL(oauthStateString), http.StatusTemporaryRedirect)
}

// AuthCallbackHandler handles responses from the authentication provider.
func AuthCallbackHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	service := vars["service"]

	config, ok := configureAuthentication(service)
	if !ok {
		fmt.Printf("Could not determine service with '%s'\n", service)
		http.Redirect(w, r, redirectTo, http.StatusTemporaryRedirect)
	}

	state := r.FormValue("state")
	if state != oauthStateString {
		fmt.Printf("Invalid OAuth state, expected '%s' but recieved '%s'\n", oauthStateString, state)
		http.Redirect(w, r, redirectTo, http.StatusTemporaryRedirect)
		return
	}

	code := r.FormValue("code")
	token, err := config.Exchange(oauth2.NoContext, code)
	if err != nil {
		fmt.Printf("Code exchange failed with '%s'\n", err)
		http.Redirect(w, r, redirectTo, http.StatusTemporaryRedirect)
		return
	}

	redirectToWithToken := fmt.Sprintf("%s?token=%s&refresh=%s&expiration=%s", redirectTo, token.AccessToken, token.RefreshToken, token.Expiry)
	http.Redirect(w, r, redirectToWithToken, http.StatusTemporaryRedirect)
}

// ConfigureAuthentication takes a service name and configures the OAuth 2.0 with
// appropriate endpoints and scopes.
func configureAuthentication(service string) (*oauth2.Config, bool) {
	ok := true
	config := &oauth2.Config{
		RedirectURL:  fmt.Sprintf("%s/auth/%s/callback", cf.PublicURI(), strings.ToLower(service)),
		ClientID:     cf.UserService("github-client", "id"),
		ClientSecret: cf.UserService("github-client", "secret"),
	}

	switch service {
	case "facebook":
		config.Endpoint = facebook.Endpoint
		config.Scopes = []string{
			"public_profile",
			"email",
			"user_birthday",
			"user_work_history",
		}
	case "github":
		config.Endpoint = github.Endpoint
		config.Scopes = []string{
			"user",
		}
	case "google":
		config.Endpoint = google.Endpoint
		config.Scopes = []string{
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
		}
	case "linkedin":
		config.Endpoint = linkedin.Endpoint
		config.Scopes = []string{
			"r_basicprofile",
			"r_contactinfo",
			"r_emailaddress",
		}
	// case "microsoft":
	// 	config.Endpoint = microsoft.Endpoint
	// 	config.Scopes = []string{
	// 		"wl.basic",
	// 		"wl.birthday",
	// 		"wl.emails",
	// 	}
	default:
		ok = false
	}

	return config, ok
}
