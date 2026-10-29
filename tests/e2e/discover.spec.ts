import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/discover')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('loads directly, filters, resets, and survives refresh', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Four places, beyond the panorama' })).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(4)
  await page.reload()
  await expect(page).toHaveURL(/\/discover$/)

  await page.getByRole('searchbox', { name: 'Search destinations' }).fill('Texel')
  await expect(page.getByRole('article')).toHaveCount(1)
  await page.getByRole('combobox', { name: 'Country' }).selectOption('germany')
  await expect(page.getByText('No places match these filters')).toBeVisible()
  await page.getByRole('region', { name: 'Filter destinations' }).getByRole('button', { name: 'Reset filters' }).click()
  await expect(page.getByRole('article')).toHaveCount(4)
})

test('persists favorites and exposes keyboard-friendly details', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Jelgava Palace to favorites' }).click()
  await page.reload()
  await expect(page.getByRole('button', { name: 'Remove Jelgava Palace from favorites' })).toBeVisible()

  const details = page.getByRole('button', { name: 'View details' }).first()
  await details.click()
  const dialog = page.getByRole('dialog', { name: 'Jelgava Palace' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close destination details' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(details).toBeFocused()
})

test('switches Discover language and deep-links to the selected panorama', async ({ page }) => {
  await page.locator('.language-trigger').click()
  await page.getByRole('button', { name: 'Tiếng Việt' }).click()
  await expect(page.getByRole('heading', { name: 'Bốn điểm đến, vượt ra ngoài panorama' })).toBeVisible()

  await page.getByRole('link', { name: 'Mở 360°' }).last().click()
  await expect(page).toHaveURL(/destination=rhine-riverbank/)
  await expect(page.getByRole('navigation', { name: 'Destinations' }).getByRole('button', { name: /Bờ sông Rhine/ })).toHaveAttribute('aria-current', 'true')
})
