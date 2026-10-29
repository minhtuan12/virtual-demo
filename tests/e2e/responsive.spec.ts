import { expect, test } from '@playwright/test'

test('keeps primary controls and horizontal destination navigation usable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Panorama 360°' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Language' })).toBeVisible()
  const destinations = page.getByRole('navigation', { name: 'Destinations' })
  await expect(destinations).toBeVisible()
  const box = await destinations.boundingBox()
  expect(box?.width).toBeLessThanOrEqual(390)
  expect(box?.y).toBeGreaterThan(650)
})
