/**
 * A user item.
 */
export default interface User {
  isAuthenticated: boolean;
  email: string;
  password: string;
  token: string;
}
