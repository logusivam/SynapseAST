import { test, expect } from '@playwright/test';

test.describe('SynapseAST Application', () => {
  test('should load the landing page successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'See Your Code Think.' })).toBeVisible();
  });

  test('should navigate to the editor workspace', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Try It Free');
    await expect(page).toHaveURL(/\/editor/);
  });
});
