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

test('uses a single-column Discover catalog on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/discover')
  const cards = page.getByRole('article')
  await expect(cards).toHaveCount(4)
  const first = await cards.nth(0).boundingBox()
  const second = await cards.nth(1).boundingBox()
  expect(first?.width).toBeLessThanOrEqual(350)
  expect(second?.y).toBeGreaterThan((first?.y ?? 0) + (first?.height ?? 0))
})
