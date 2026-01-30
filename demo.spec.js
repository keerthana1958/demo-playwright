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
  await page.goto(
    'https://demo.suiteondemand.com/index.php?action=Login&module=Users',
    { timeout:60000, waitUntil: 'domcontentloaded' }
  );
  await page.click("#bigbutton")
  const message = await page.locator('input[name="user_name"]').evaluate(el => el.validationMessage)
  console.log(message) 
  expect(message).toContain('Please fill in this field.')
   //without password//
   await page.goto(
    'https://demo.suiteondemand.com/index.php?action=Login&module=Users',
    { timeout:60000, waitUntil: 'domcontentloaded' }
  );
  await page.locator('input[name="user_name"]').fill('will')
  await page.click("#bigbutton")
  await expect(page.getByText('You must specify a valid username and password.')).toBeVisible()
  //without username//
  await page.goto(
    'https://demo.suiteondemand.com/index.php?action=Login&module=Users',
    { timeout:60000, waitUntil: 'domcontentloaded' }
  );
  await page.locator('#username_password').fill('will')
  await page.locator('input[name="user_name"]').clear()
  await page.click("#bigbutton")
  const val = await page.locator('input[name="user_name"]').evaluate(el => el.validationMessage)
  console.log(val) 
  expect(val).toContain('Please fill in this field.')

//with invalid username and password//
 await page.goto(
    'https://demo.suiteondemand.com/index.php?action=Login&module=Users',
    { timeout:60000, waitUntil: 'domcontentloaded' }
  );
   await page.locator('#username_password').clear()
  await page.locator('input[name="user_name"]').clear()
  await page.locator('input[name="user_name"]').fill('keer')
  await page.locator('#username_password').fill('thana')
  await page.click("#bigbutton")
  await expect(page.getByText('You must specify a valid username and password.')).toBeVisible()
  //with valid username and invalid password//
 await page.goto(
    'https://demo.suiteondemand.com/index.php?action=Login&module=Users',
    { timeout:60000, waitUntil: 'domcontentloaded' }
  );
   await page.locator('#username_password').clear()
  await page.locator('input[name="user_name"]').clear()
  await page.locator('input[name="user_name"]').fill('will')
  await page.locator('#username_password').fill('thana')
  await page.click("#bigbutton")
  await expect(page.getByText('You must specify a valid username and password.')).toBeVisible()
  //with Invalid username and valid password//
 await page.goto(
    'https://demo.suiteondemand.com/index.php?action=Login&module=Users',
    { timeout:60000, waitUntil: 'domcontentloaded' }
  );
   await page.locator('#username_password').clear()
  await page.locator('input[name="user_name"]').clear()
  await page.locator('input[name="user_name"]').fill('Keer')
  await page.locator('#username_password').fill('will')
  await page.click("#bigbutton")
  await expect(page.getByText('You must specify a valid username and password.')).toBeVisible()
  //with valid username and valid password//
 await page.goto(
    'https://demo.suiteondemand.com/index.php?action=Login&module=Users',
    { timeout:60000, waitUntil: 'domcontentloaded' }
  );
   await page.locator('#username_password').clear()
  await page.locator('input[name="user_name"]').clear()
  await page.locator('input[name="user_name"]').fill('will')
  await page.locator('#username_password').fill('will')
  await page.click("#bigbutton")
  await expect(page.getByText('Welcome to the SuiteCRM 7 Demo')).toBeVisible()
});



