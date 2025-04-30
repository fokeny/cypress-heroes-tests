class LoginPage {
    selectorsList() {
        const selectors = {
            loginPageButton: "li > .undefined",
            usernameField: "[data-cy='email']",
            passwordField: "[data-cy='password']",
            singinButton: ".bg-blue-700",
            wrongCredentialAlert: ".text-red-500",

        }
        return selectors
        
    }
    acessLoginPage() {
        cy.get(this.selectorsList().loginPageButton).eq(0).click({ force: true})
    }

    loginWithAnyUser(username: string,password: string) {
        cy.get(this.selectorsList().usernameField).type(username)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().singinButton).click()

    }

    checkAccesInvalid () {
        cy.get(this.selectorsList().wrongCredentialAlert).should('contain', 'Invalid email or password')
    }
    
    checkUsernameInvalid () {
        cy.get(this.selectorsList().wrongCredentialAlert).should('contain', 'Email is required')
    }

    checkUsernameCharsInvalid () {
        cy.get(this.selectorsList().wrongCredentialAlert).should('contain', 'Email is not valid')
    }

    checkPasswordInvalid () {
        cy.get(this.selectorsList().wrongCredentialAlert).should('contain', 'Password is required')
    }

    checkUsernameAndPasswordInvalid () {
        cy.get(this.selectorsList().wrongCredentialAlert).eq(0).should('contain', 'Email is required')
        cy.get(this.selectorsList().wrongCredentialAlert).eq(1).should('contain', 'Password is required')
    }


}
export default LoginPage

