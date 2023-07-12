import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel('Login/Logout flow', () => {
  //NOTE: Using another site because browsers throw security error and denied access if try site from Udemy course t
  // before hooks
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
  })

  // negative scenario
  test('Negative scenario for login flow', async ({ page }) => {
    await page.type('#user-name', 'Invalid username')
    await page.type('#password', 'Invalid password')
    await page.click('[data-test="login-button"]')

    const errorMessage = await page.locator('[data-test="error"]')
    await expect(errorMessage).toContainText(
      'Epic sadface: Username and password do not match any user in this servic'
    )
  })

  // positive scenario
  test('Postitive scenario for login + logout flow', async ({ page }) => {
    await page.type('#user-name', 'standard_user')
    await page.type('#password', 'secret_sauce')
    await page.click('[data-test="login-button"]')
    const title = await page.locator('.title')
    await expect(title).toBeVisible()

    await page.click('#react-burger-menu-btn')
    await page.click('#logout_sidebar_link')
    const loginButton = await page.locator('[data-test="login-button"]')
    await expect(loginButton).toBeVisible()
  })
})
