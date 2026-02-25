import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Given('que estou na página de login do The Internet', async () => {
  await global.page.goto('https://the-internet.herokuapp.com/login')
  await global.page.waitForLoadState('domcontentloaded')
})

When('preencho o usuário com {string}', async (usuario: string) => {
  await global.page.fill('#username', usuario)
})

When('preencho a senha com {string}', async (senha: string) => {
  await global.page.fill('#password', senha)
})

When('clico no botão de login', async () => {
  await global.page.click('button[type="submit"]')
  await global.page.waitForLoadState('domcontentloaded')
})

Then('devo ver a mensagem de boas-vindas {string}', async (mensagem: string) => {
  const flash = global.page.locator('#flash')
  await expect(flash).toContainText(mensagem)
})

Then('devo ver uma mensagem de erro de login', async () => {
  const flash = global.page.locator('#flash')
  await expect(flash).toBeVisible()
  await expect(flash).toContainText('Your username is invalid!')
})
