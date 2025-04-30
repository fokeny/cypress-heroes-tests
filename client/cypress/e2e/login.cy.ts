import userData from "../fixtures/users/userData.json"
import LoginPage from '../pages/loginPage'

const loginPage = new LoginPage()


const TEST_DATA = {
  specialChars: '!@#$%^&*()',
  longString: 'a'.repeat(100),
  unicodeChars: '😀🔑',
}

describe('Testes de Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/heroes')
    loginPage.acessLoginPage()
  })

  describe('Cenário de Sucesso', () => {
    it('Deve fazer login com um usuário válido', () => {
      loginPage.loginWithAnyUser(userData.userSuccess.username,userData.userSuccess.password)

      cy.get('li > .undefined').should('contain', 'Logout')
    })
  })

  describe('Validações de Credenciais', () => {
    it('Deve exibir erro ao tentar login com username correto e senha incorreta', () => {
      loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userFail.password)

      loginPage.checkAccesInvalid()
    })

    it('Deve exibir erro ao tentar login com username incorreto e senha correta', () => {
      loginPage.loginWithAnyUser(userData.userFail.username, userData.userSuccess.password)

      loginPage.checkAccesInvalid()
    })

    it('Deve exibir erro ao tentar login com username e senha incorretos', () => {
      loginPage.loginWithAnyUser(userData.userFail.username, userData.userFail.password)

      loginPage.checkAccesInvalid()
    })
  })

  describe('Validações de Campos Vazios', () => {
    it('Deve exibir uma mensagem ao tentar login sem username e com senha correta', () => {
    loginPage.loginWithAnyUser('{backspace}', userData.userSuccess.password)

      loginPage.checkUsernameInvalid()
    })

    it('Deve exibir uma mensagem ao tentar login sem username e com senha incorreta', () => {
      loginPage.loginWithAnyUser('{backspace}', userData.userFail.password)

      loginPage.checkUsernameInvalid()
    })

    it('Deve exibir uma mensagem ao tentar login com username correto e sem senha', () => {
      loginPage.loginWithAnyUser(userData.userSuccess.username, '{backspace}')

      loginPage.checkPasswordInvalid()
    })

    it('Deve exibir uma mensagem ao tentar login com username incorreto e sem senha', () => {
      loginPage.loginWithAnyUser(userData.userFail.username, '{backspace}')

      loginPage.checkPasswordInvalid()
    })

    it('Deve exibir duas mensagens ao tentar login sem username e sem senha', () => {
      loginPage.loginWithAnyUser('{backspace}', '{backspace}')

      loginPage.checkUsernameAndPasswordInvalid()
    })
  })

  describe('Validações de Formato', () => {
    it('Deve exibir uma mensagem ao tentar login com caracteres especiais no username', () => {
      loginPage.loginWithAnyUser(TEST_DATA.specialChars, userData.userSuccess.password)

      loginPage.checkUsernameCharsInvalid()
    })

    it('Deve exibir uma mensagem ao tentar login com caracteres Unicode/emojis', () => {
      loginPage.loginWithAnyUser(TEST_DATA.unicodeChars, userData.userSuccess.password)

      loginPage.checkUsernameCharsInvalid()
    })

    it('Deve exibir uma mensagem ao tentar login com espaços em branco', () => {
      loginPage.loginWithAnyUser(' ', ' ')

      loginPage.checkUsernameInvalid()
    })
  })

  describe('Validações de Comprimento', () => {
    it('Deve exibir erro ao tentar login com username muito longo', () => {
      loginPage.loginWithAnyUser(TEST_DATA.longString, userData.userSuccess.password)
      loginPage.checkUsernameCharsInvalid()
    })

    it('Deve exibir erro ao tentar login com senha muito longa', () => {
      loginPage.loginWithAnyUser(userData.userSuccess.username, TEST_DATA.longString)

      loginPage.checkAccesInvalid()
    })
  })
})