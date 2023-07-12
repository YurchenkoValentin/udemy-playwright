import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/homePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe('Feedback form', () => {
  let homePage: HomePage
  let feedbackPage: FeedbackPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)

    await homePage.visit()
    await homePage.clickOnFeedbackLink()
  })

  //Reset feedback form
  test('Reset feedback form', async () => {
    await feedbackPage.fillForm(
      'Some name',
      'Some email',
      'Some subject',
      'Some nice comment about application'
    )
    await feedbackPage.resetForm()
    await feedbackPage.assertReset()
  })

  //Submit feedback form
  test('Submit feedback form', async () => {
    await feedbackPage.fillForm(
      'Some name',
      'Some email',
      'Some subject',
      'Some nice comment about application'
    )
    await feedbackPage.submitForm()
    await feedbackPage.feedbackFormSent()
  })
})
