import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Given('que estou na página de adicionar e remover elementos do The Internet', async () => {
  await global.page.goto('https://the-internet.herokuapp.com/add_remove_elements/')
  await global.page.waitForLoadState('domcontentloaded')
})

When('clico no botão {string}', async (label: string) => {
  await global.page.click(`button:has-text("${label}")`)
})

Then('devo ver o botão {string} na página', async (label: string) => {
  const botao = global.page.locator(`button:has-text("${label}")`)
  await expect(botao.first()).toBeVisible()
})

Then('não devo ver nenhum botão {string} na página', async (label: string) => {
  const botao = global.page.locator(`button:has-text("${label}")`)
  await expect(botao).toHaveCount(0)
})
