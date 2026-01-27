import { test, expect } from '@playwright/test';

test('weblink', async ({ page }) => {
test.setTimeout(60000)
//url check//
  await page.goto(
    'https://demo.suiteondemand.com/index.php?action=Login&module=Users',
    { timeout:60000, waitUntil: 'domcontentloaded' }
  );
//UI//
  await expect(page.locator('input[name="user_name"]')).toBeVisible();
  await expect(page.locator('#username_password')).toBeVisible();
  await expect(page.locator("a[title='SuiteCRM']")).toBeVisible();
  await expect(page.locator('input[name="user_name"]')).toHaveAttribute('placeholder','Username');
  await expect(page.locator('#username_password')).toHaveAttribute('placeholder','Password');
 //masked -password// 
  const type = await page.locator('#username_password').getAttribute('type')
  expect(type).toBe('password')
  //login button//
  await expect(page.locator("#bigbutton")).toBeEnabled();
  //validation//
  //without credentials//
  await page.click("#bigbutton")
  
 
});



