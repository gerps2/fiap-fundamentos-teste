import { Given, When, Then, DataTable } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Given('que estou na página de web tables do DemoQA', async () => {
  await global.page.goto('https://demoqa.com/webtables', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await global.page.waitForSelector('#addNewRecordButton', { timeout: 15000 })
})

When('clico no botão de adicionar registro', async () => {
  await global.page.click('#addNewRecordButton')
  await global.page.waitForTimeout(500)
})

When('preencho o formulário de registro com os seguintes dados:', async (tabela: DataTable) => {
  const dados = tabela.rowsHash()

  const mapeamento: Record<string, string> = {
    'Primeiro Nome': '#firstName',
    'Sobrenome': '#lastName',
    'Email': '#userEmail',
    'Idade': '#age',
    'Salário': '#salary',
    'Departamento': '#department',
  }

  for (const [campo, valor] of Object.entries(dados)) {
    const seletor = mapeamento[campo]
    if (seletor) {
      await global.page.fill(seletor, valor)
    }
  }
})

When('submeto o formulário de registro', async () => {
  await global.page.click('#submit')
  await global.page.waitForTimeout(500)
})

Then('devo ver {string} na tabela', async (texto: string) => {
  const celula = global.page.locator(`.rt-td:has-text("${texto}")`)
  await expect(celula.first()).toBeVisible()
})
