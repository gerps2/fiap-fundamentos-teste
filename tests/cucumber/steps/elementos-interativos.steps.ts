import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Given('que estou na página de botões do DemoQA', async () => {
  await global.page.goto('https://demoqa.com/buttons', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await global.page.waitForSelector('#doubleClickBtn', { timeout: 20000 })
})

When('realizo um duplo clique no botão de duplo clique', async () => {
  await global.page.dblclick('#doubleClickBtn')
})

When('realizo um clique direito no botão de clique direito', async () => {
  await global.page.click('#rightClickBtn', { button: 'right' })
})

When('clico no botão de clique dinâmico', async () => {
  await global.page.click('button:has-text("Click Me"):not(#doubleClickBtn):not(#rightClickBtn)')
})

Then('devo ver a mensagem {string}', async (mensagem: string) => {
  const elemento = global.page.locator(`text=${mensagem}`)
  await expect(elemento).toBeVisible()
})
