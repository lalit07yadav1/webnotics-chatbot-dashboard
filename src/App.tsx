import { lazy, Suspense } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </header>
      <main className="main">
        <Suspense fallback={<div>Loading...</div>}>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/" element={<Navigate to="/signup" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/signup" replace />} />
            </Routes>
          </Elements>
        </Suspense>
      </main>
    </div>
  );
}


