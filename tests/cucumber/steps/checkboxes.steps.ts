import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Given('que estou na página de checkboxes do The Internet', async () => {
  await global.page.goto('https://the-internet.herokuapp.com/checkboxes')
  await global.page.waitForLoadState('domcontentloaded')
})

When('marco a primeira checkbox', async () => {
  const checkboxes = global.page.locator('input[type="checkbox"]')
  const primeira = checkboxes.first()
  const marcada = await primeira.isChecked()
  if (!marcada) {
    await primeira.check()
  }
})

When('desmarco a segunda checkbox', async () => {
  const checkboxes = global.page.locator('input[type="checkbox"]')
  const segunda = checkboxes.last()
  const marcada = await segunda.isChecked()
  if (marcada) {
    await segunda.uncheck()
  }
})

Then('a primeira checkbox deve estar marcada', async () => {
  const primeira = global.page.locator('input[type="checkbox"]').first()
  await expect(primeira).toBeChecked()
})

Then('a segunda checkbox deve estar desmarcada', async () => {
  const segunda = global.page.locator('input[type="checkbox"]').last()
  await expect(segunda).not.toBeChecked()
})
