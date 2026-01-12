# webnotics-chatbot-dashboard

Admin dashboard (React + Vite) with black/white theme, Signup with Stripe, and Login.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file at the project root and set your Stripe publishable key:

```bash
echo "VITE_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXX" > .env
```

3. Start the dev server:

```bash
npm run dev
```

Open the printed local URL.

## Pages

- Signup: supports Free and Paid plans. Paid plan uses Stripe Card Element and calls `http://206.189.125.220:8000/create-account`.
- Login: placeholder form that posts to `http://206.189.125.220:8000/login`.

Update backend URLs as needed.
