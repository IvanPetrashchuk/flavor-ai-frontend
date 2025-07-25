import { JWT_TOKEN_NAME } from "@constants/globals";
import { BASE_URL, URLS } from "@constants/urls";

let isRedirecting = false;

export const getTokenFromSessionStorage = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(JWT_TOKEN_NAME);
  }
  return null;
};

export const fetchRequest = async ({ method = "GET", URL, body = null }) => {
  const token = getTokenFromSessionStorage();
  const headers = {
    Origin: BASE_URL,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(URL, config);
    const httpStatus = response.status;

    if (response.status === 401) {
      if (!isRedirecting) {
        isRedirecting = true;
        console.warn("401 Unauthorized: Redirecting to login page.");

        if (typeof window !== "undefined") {
          sessionStorage.removeItem(JWT_TOKEN_NAME);
        }

        if (typeof window !== "undefined") {
          window.location.href = URLS.LOGIN;
        }
      }

      return { httpStatus: httpStatus };
    }

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorMessage = response.statusText || "Unknown error";
      let errorData = {};

      if (contentType && contentType.includes("application/json")) {
        try {
          errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          console.error("Error parsing JSON error response:", jsonError);
        }
      }
      const finalError = new Error(errorMessage);
      finalError.httpStatus = httpStatus;
      finalError.responseBody = errorData;
      throw finalError;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const jsonData = await response.json();
      return { data: jsonData, httpStatus: response.status };
    }
    return { data: null, httpStatus: response.status };
  } catch (error) {
    throw error;
  }
};
