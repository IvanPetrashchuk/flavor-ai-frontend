export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";



export const URLS = {
  LOGIN: "/user/login",
  REGISTER: `/user/register`,
  FORGOTPASSWORD: `/user/forgotpassword`,
  RECEPTS: `/recepts`,
};

export const API_URLS = {
  LOGIN: `${BACKEND_URL}/auth/login`,
  REGISTER: `${BACKEND_URL}/auth/register`,
};
