import { test, expect } from '@playwright/test';

// Vor jedem Test einloggen
test.beforeEach(async ({ page }) => {
  const baseUrl = process.env.CI ? 'http://basex:8080' : 'http://localhost:8080/api';
  await page.goto(`${baseUrl}/dba/login`);
  await page.locator('input[name="_name"]').fill('admin');
  await page.locator('input[name="_name"]').press('Tab');
  await page.locator('input[name="_pass"]').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
});

// Optional: Nach jedem Test ausloggen
test.afterEach(async ({ page }) => {
  await page.getByRole('link', { name: 'logout' }).click();
});

test('Test: Settings', async ({ page }) => {
  await page.getByRole('link', { name: 'Settings' }).click();
  // …jetzt kommt der Testcode
});

test('Test: Logs', async ({ page }) => {
  await page.getByRole('link', { name: 'Logs' }).click();
  // …jetzt kommt der Testcode
});

test('Test: Databases', async ({ page }) => {
  await page.getByRole('link', { name: 'Databases' }).click();
  await page.getByRole('link', { name: 'Editor' }).click();
  await page.locator('.CodeMirror-scroll').first().click();
  await page.locator('td').filter({ hasText: 'x 1' }).getByRole('textbox').fill('db:create(\'foo\',<foo />,\'index.html\')');
  await page.getByRole('button', { name: 'Run' }).click();
  await page.getByRole('link', { name: 'Databases' }).click();
  await expect(page.getByRole('link', { name: 'foo' })).toBeVisible();
});

test('Test: Editor', async ({ page }) => {
  await page.getByRole('link', { name: 'Editor' }).click();
  // …jetzt kommt der Testcode
});

test('Test: Files', async ({ page }) => {
  await page.getByRole('link', { name: 'Files' }).click();
  // …jetzt kommt der Testcode
});

test('Test: Jobs', async ({ page }) => {
  await page.getByRole('link', { name: 'Jobs' }).click();
  // …jetzt kommt der Testcode
});

test('Test: Users', async ({ page }) => {
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('button', { name: 'Create…' }).click();
  await page.locator('input[name="name"]').fill('playwright');
  await page.locator('input[name="name"]').press('Tab');
  await page.locator('input[name="pw"]').fill('playwright');
  await page.getByRole('listbox').selectOption('write');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('link', { name: 'Logs' }).click();
  await page.getByRole('link', { name: 'Users' }).click();
  await page.getByRole('cell', { name: 'playwright', exact: true }).getByRole('checkbox').check();
  page.on('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept()
  });
  await page.getByRole('button', { name: 'Drop' }).click();
  await page.getByText('user was dropped.').click();
});

test('Test: Sessions', async ({ page }) => {
  await page.getByRole('link', { name: 'Sessions' }).click();
  // …jetzt kommt der Testcode
});
