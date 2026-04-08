import { test, expect } from '@playwright/test';

//Dashboard
test('has title', async ( {page} ) => {
  await page.goto('http://localhost:5173/dashboard');

  await expect(page).toHaveURL('http://localhost:5173/dashboard')
});

//passwordreset
test('has title', async ( {page} ) => {
  await page.goto('http://localhost:5173/passwordreset');

  await expect(page).toHaveURL('http://localhost:5173/passwordreset')
});

//login
test('has title', async ( {page} ) => {
  await page.goto('http://localhost:5173/login');

  await expect(page).toHaveURL('http://localhost:5173/login')
});

//Register new user
test('has title', async ( {page} ) => {
  await page.goto('http://localhost:5173/register');

  await expect(page).toHaveURL('http://localhost:5173/register')
});

//Payments
test('has title', async ( {page} ) => {
  await page.goto('http://localhost:5173/payments');

  await expect(page).toHaveURL('http://localhost:5173/payments')
});

//Reports
test('has title', async ( {page} ) => {
  await page.goto('http://localhost:5173/reports');

  await expect(page).toHaveURL('http://localhost:5173/reports')
});

//Settings
test('has title', async ( {page} ) => {
  await page.goto('http://localhost:5173/settings');

  await expect(page).toHaveURL('http://localhost:5173/settings')
});

//Tenants
test('has title', async ( {page} ) => {
  await page.goto('http://localhost:5173/tenants');

  await expect(page).toHaveURL('http://localhost:5173/tenants')
});