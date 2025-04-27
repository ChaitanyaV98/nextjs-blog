const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Running on client
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const BASE_URL = getBaseUrl();
