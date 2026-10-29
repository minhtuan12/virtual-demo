import { expect, test } from '@playwright/test'

test('switches all interface copy while keeping narration English-only', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('combobox', { name: 'Language' }).selectOption('ja')
  await expect(page.getByText('場所の間を歩く・デモ')).toBeVisible()
  await expect(page.getByRole('button', { name: '英語ナレーション' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('combobox', { name: '言語' })).toHaveValue('ja')
})

test('offers all five complete interface locales', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('combobox', { name: 'Language' }).locator('option')).toHaveCount(5)
})
