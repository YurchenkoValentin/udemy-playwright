import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/homePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login page visual tests', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
  })

  test('Login form', async ({ page }) => {
    await loginPage.snapshotLoginForm()
  })

  test('Login error message', async ({ page }) => {
    await loginPage.login('Fail username', 'Invalid password')
    await loginPage.snapshotErrorMessage()
  })
})
