/**
 * Token utility functions for managing JWT auth tokens
 */

interface TokenPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  aid?: number;
  [key: string]: any;
}

/**
 * Decode JWT token without verification (client-side only)
 * Returns null if token is invalid or cannot be decoded
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    // Decode the payload (second part)
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

/**
 * Check if a token is expired
 * Returns true if token is expired or invalid
 */
export function isTokenExpired(token: string | null): boolean {
  if (!token) {
    return true;
  }

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  // exp is in seconds, Date.now() is in milliseconds
  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();
  
  return currentTime >= expirationTime;
}

/**
 * Get token expiration date as a Date object
 * Returns null if token is invalid or has no expiration
 */
export function getTokenExpiration(token: string | null): Date | null {
  if (!token) {
    return null;
  }

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return null;
  }

  // exp is in seconds, convert to milliseconds
  return new Date(decoded.exp * 1000);
}

/**
 * Get time until token expires in milliseconds
 * Returns 0 or negative if expired
 */
export function getTimeUntilExpiry(token: string | null): number {
  if (!token) {
    return 0;
  }

  const expirationDate = getTokenExpiration(token);
  if (!expirationDate) {
    return 0;
  }

  return expirationDate.getTime() - Date.now();
}

/**
 * Get token expiration as a human-readable string
 * Returns format like "Expires in 5 hours" or "Expired 2 hours ago"
 */
export function getTokenExpirationString(token: string | null): string {
  if (!token) {
    return 'No token';
  }

  if (isTokenExpired(token)) {
    const expirationDate = getTokenExpiration(token);
    if (!expirationDate) {
      return 'Token invalid';
    }
    
    const expiredMs = Date.now() - expirationDate.getTime();
    const expiredHours = Math.floor(expiredMs / (1000 * 60 * 60));
    const expiredMinutes = Math.floor((expiredMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (expiredHours > 0) {
      return `Expired ${expiredHours} hour${expiredHours > 1 ? 's' : ''} ago`;
    } else {
      return `Expired ${expiredMinutes} minute${expiredMinutes !== 1 ? 's' : ''} ago`;
    }
  }

  const timeUntilExpiry = getTimeUntilExpiry(token);
  const hours = Math.floor(timeUntilExpiry / (1000 * 60 * 60));
  const minutes = Math.floor((timeUntilExpiry % (1000 * 60 * 60)) / (1000 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `Expires in ${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `Expires in ${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    return `Expires in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
}

/**
 * Get auth token from localStorage and check if it's valid
 * Returns the token if valid, null if expired or missing
 */
export function getValidToken(): string | null {
  const token = localStorage.getItem('auth_token');
  if (!token || isTokenExpired(token)) {
    // Remove expired token
    if (token) {
      localStorage.removeItem('auth_token');
    }
    return null;
  }
  return token;
}

/**
 * Clear auth token from localStorage
 */
export function clearAuthToken(): void {
  localStorage.removeItem('auth_token');
}


