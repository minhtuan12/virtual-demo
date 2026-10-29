import { expect, test } from '@playwright/test'

test('hides AI guide when the optional runtime is unavailable', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Ask the AI guide' })).toHaveCount(0)
})

test('shows and streams the AI guide when the runtime is available', async ({ page }) => {
  await page.addInitScript(() => {
    ;(window as typeof window & { claude: unknown }).claude = {
      use: async () => async (_prompt: string, options: { onText(output: { text: string }): void }) => {
        options.onText({ text: 'Streaming guide answer' })
        return { text: 'Final guide answer' }
      },
    }
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Start exploring' }).click()
  await page.getByRole('button', { name: 'Ask the AI guide' }).click()
  await expect(page.getByRole('region', { name: 'AI guide' })).toBeVisible()
  await page.getByPlaceholder('Ask about the place you are viewing…').fill('Tell me more')
  await page.getByRole('button', { name: 'Send' }).click()
  await expect(page.getByText('Final guide answer')).toBeVisible()
})
