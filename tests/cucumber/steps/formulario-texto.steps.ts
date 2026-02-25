import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Given('que estou na página de formulário de texto do DemoQA', async () => {
  await global.page.goto('https://demoqa.com/text-box', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await global.page.waitForSelector('#userName', { timeout: 15000 })
})

When('preencho o campo {string} com {string}', async (campo: string, valor: string) => {
  const seletores: Record<string, string> = {
    'Nome Completo': '#userName',
    'Email': '#userEmail',
    'Endereço Atual': '#currentAddress',
  }
  const seletor = seletores[campo]
  await global.page.fill(seletor, valor)
})

When('clico no botão de submissão do formulário', async () => {
  await global.page.click('#submit')
  await global.page.waitForSelector('#output', { timeout: 10000 })
})

Then('devo ver o nome {string} na saída', async (nome: string) => {
  const elemento = global.page.locator('#name')
  await expect(elemento).toContainText(nome)
})

Then('devo ver o email {string} na saída', async (email: string) => {
  const elemento = global.page.locator('#email')
  await expect(elemento).toContainText(email)
})
