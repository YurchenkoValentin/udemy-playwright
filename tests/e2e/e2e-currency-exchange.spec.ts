import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/homePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Pay bills form', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  })

  test('Should make payment using foreign card', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.click('text=Purchase Foreign Currency')
    await page.selectOption('#pc_currency', 'AUD')
    const currencyRate = await page.locator('#sp_sell_rate')
    await expect(currencyRate).toContainText('1 dollar (AUD)')
    await page.type('#pc_amount', '500')
    await page.click('#pc_inDollars_true')
    await page.click('#pc_calculate_costs')
    const conversationAmount = await page.locator('#pc_conversion_amount')
    await expect(conversationAmount).toContainText('dollar (AUD) = ')
    await page.click('#purchase_cash')
    const messageSuccess = await page.locator('#alert_content')
    await expect(messageSuccess).toHaveText(
      'Foreign currency cash was successfully purchased.'
    )
  })
})
