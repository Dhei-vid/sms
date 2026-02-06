/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * JWT Helper Functions
 * Handles token generation and decryption for authentication
 */

interface Payload {
  [key: string]: any;
}

const tokenSecret = process.env.NEXT_PUBLIC_JWT_SECRET as string;

// Only import jwt on server side
let jwt: any = null;
if (typeof window === "undefined") {
  try {
    jwt = require("jsonwebtoken");
  } catch (e) {
    console.warn("jsonwebtoken not available - token operations will fail");
  }
}

/**
 * Generate a JWT token (server-side only)
 */
export const generateToken = (data: Payload, time: string | number): string => {
  if (!tokenSecret) {
    throw new Error("JWT secret is not defined, GEN");
  }

  if (!jwt) {
    throw new Error("JWT library not available");
  }

  const options = {
    expiresIn: time,
  };

  const token = jwt.sign(data, tokenSecret, options);
  return token;
};

interface DecryptTokenResult {
  success: boolean;
  data: any | null;
}

/**
 * Decrypt/decode a JWT token
 * On client-side: simple base64 decode (no verification)
 * On server-side: full verification using jsonwebtoken
 */
export const decryptToken = (token: string): DecryptTokenResult => {
  let tokenData: DecryptTokenResult = { success: false, data: null };

  if (!tokenSecret) {
    console.error("JWT secret is not defined");
    return tokenData;
  }

  // On client side, try to decode without verification (less secure but works)
  if (typeof window !== "undefined") {
    try {
      // Simple base64 decode for client-side (without verification)
      // For production, use a proper JWT library like jose or jwt-decode
      const parts = token.split(".");
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        tokenData = { success: true, data: payload };
      }
    } catch (error) {
      console.warn("Failed to decode token on client:", error);
    }
    return tokenData;
  }

  // Server-side: use jsonwebtoken with verification
  if (!jwt) {
    console.error("JWT library not available on server");
    return tokenData;
  }

  try {
    jwt.verify(token, tokenSecret, (error: any, decoded: any) => {
      if (!error) {
        tokenData = { success: true, data: decoded };
      }
    });
  } catch (error) {
    console.warn("Failed to verify token:", error);
  }

  return tokenData;
};
