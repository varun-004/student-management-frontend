import { LoginPage } from "../pages/LoginPage";
import { users } from "../data/users";

export async function loginAsAdmin(page) {
  const login = new LoginPage(page);

  await login.goto();

  await login.login(
    users.admin.email,
    users.admin.password
  );

  await login.verifyLogin();
}