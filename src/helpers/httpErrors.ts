export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export class AuthenticationError extends HttpError {
  constructor(message: string = 'Authentication failed', originalError?: any) {
    super(401, message, originalError);
    this.name = 'AuthenticationError';
  }
}

export class TokenExpiredError extends HttpError {
  constructor(message: string = 'Session expired', originalError?: any) {
    super(498, message, originalError);
    this.name = 'TokenExpiredError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network error', public readonly originalError?: any) {
    super(message);
    this.name = 'NetworkError';
  }
}