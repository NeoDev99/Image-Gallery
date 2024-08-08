import React from 'react';
import { ClerkProvider, RedirectToSignIn, SignedIn } from '@clerk/clerk-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';

const clerkFrontendApi = process.env.CLERK_FRONTEND_API;

function ClerkConfig() {
  return (
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sign-in/*" element={<RedirectToSignIn />} />
          <Route path="/sign-up/*" element={<RedirectToSignIn />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default ClerkConfig;
