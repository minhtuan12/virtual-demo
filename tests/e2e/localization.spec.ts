import { expect, test } from '@playwright/test'

test('switches all interface copy while keeping narration English-only', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Language' }).click()
  await page.getByRole('button', { name: '日本語' }).click()
  await expect(page.getByText('場所の間を歩く')).toBeVisible()
  await expect(page.getByRole('button', { name: '英語ナレーション' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('button', { name: '言語' })).toBeVisible()
})

test('offers all five complete interface locales', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Language' }).click()
  await expect(page.locator('.language-menu button')).toHaveCount(5)
})
