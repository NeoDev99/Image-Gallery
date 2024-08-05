const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const clerkMiddleware = ClerkExpressWithAuth({
  apiKey: process.env.CLERK_API_KEY,
  apiVersion: 2,
});

module.exports = clerkMiddleware;
