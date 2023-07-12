import { test, expect } from '@playwright/test'
import { loadHomePage, assertTitle } from '../helpers'

test('Simple basic test', async ({ page }) => {
  await page.goto('http://example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test.skip('Selectors', async ({ page }) => {
  // NOTE: Text selector. Feature of Playwright
  await page.click('text=some text')

  // NOTE: CSS selectors
  await page.click('button') // tag
  await page.click('.button') // class
  await page.click('#button') // id
  await page.click('[button=submit]') // attribute

  // NOTE: Only visible CSS selectors. Feature of Playwright
  await page.click('.submit-button:visible')

  // NOTE: Combinations
  await page.click('#username .first')

  // NOTE: XPATH
  await page.click('//button')
})

test.describe('My first test suit', () => {
  test('Clicking on element', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong')
  })

  test('Working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.type('#user_login', 'some usernames')
    await page.type('#user_password', 'some password')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong')
  })

  test('Assertions @myTag', async ({ page }) => {
    await page.goto('http://example.com')
    await expect(page).toHaveURL('http://example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible //TODO: It's not working correctly. Figure it out. Now it just ignored
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('.random')
    await expect(nonExistingElement).not.toBeVisible // TODO: It's not working correctly. Figure it out. Now it just ignored
  })

  test.describe.parallel.only('Hooks', async () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://example.com')
    })

    test('Screenshots', async ({ page }) => {
      await page.screenshot({ path: 'screenshot.png', fullPage: true })
    })

    test('Single element screenshot', async ({ page }) => {
      const element = await page.locator('h1')
      await element.screenshot({ path: 'single-element-screenshot2.png' })
    })
  })

  test('Custom helpers', async ({ page }) => {
    await loadHomePage(page)
    // await page.pause()
    await assertTitle(page)
  })
})
