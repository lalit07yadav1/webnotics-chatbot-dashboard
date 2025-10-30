import { FormEvent, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function Signup() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [pincode, setPincode] = useState('');
  const [subscriptionType, setSubscriptionType] = useState<'free' | 'paid'>('free');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFreeAccountCreation = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://webnotics-chatbot.onrender.com/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          name: name,
          phone_number: phoneNumber || null,
          subscription_type: 'free',
          country: country || null,
          state: stateRegion || null,
          address_line1: address1 || null,
          address_line2: address2 || null,
          pincode: pincode || null
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create free account');
      }
      if (data.success) {
        setSuccess(true);
        console.log('Free account created:', data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaidAccountCreation = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!stripe || !elements) {
      setError('Stripe not loaded');
      setLoading(false);
      return;
    }
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: name,
          email: email,
          phone: phoneNumber || undefined,
          address: {
            country: country || undefined,
            state: stateRegion || undefined,
            line1: address1 || undefined,
            line2: address2 || undefined,
            postal_code: pincode || undefined
          }
        }
      });
      if (pmError) {
        throw new Error(pmError.message);
      }
      const response = await fetch('https://webnotics-chatbot.onrender.com/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          name: name,
          phone_number: phoneNumber || null,
          subscription_type: 'paid',
          payment_method_id: paymentMethod?.id,
          country: country || null,
          state: stateRegion || null,
          address_line1: address1 || null,
          address_line2: address2 || null,
          pincode: pincode || null
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create subscription');
      }
      if (data.client_secret) {
        const { error: confirmError } = await stripe.confirmCardPayment(data.client_secret);
        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }
      if (data.success) {
        setSuccess(true);
        console.log('Account created:', {
          accountId: data.account_id,
          customerId: data.stripe_customer_id,
          subscriptionId: data.stripe_subscription_id,
          status: data.subscription_status
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1 className="title">Create your account</h1>
      <form className="stack" onSubmit={subscriptionType === 'paid' ? handlePaidAccountCreation : handleFreeAccountCreation}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Full Name"
        />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number (Optional)"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        />
        <input
          type="text"
          value={stateRegion}
          onChange={(e) => setStateRegion(e.target.value)}
          placeholder="State/Region"
        />
        <input
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          placeholder="Address line 1"
        />
        <input
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          placeholder="Address line 2 (Optional)"
        />
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Pincode / Postal code"
        />
        <select value={subscriptionType} onChange={(e) => setSubscriptionType(e.target.value as 'free' | 'paid')}>
          <option value="free">Free</option>
          <option value="paid">Paid ($9.99/month)</option>
        </select>
        {subscriptionType === 'paid' && (
          <div style={{ padding: '10px', border: '1px solid #2a2a2a', borderRadius: '8px', background: '#0f0f0f' }}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    '::placeholder': { color: '#aab7c4' }
                  }
                }
              }}
            />
          </div>
        )}
        <button type="submit" disabled={loading || !stripe || (subscriptionType === 'paid' && !elements)}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">Account created successfully!</div>}
        <p className="muted">By continuing, you agree to our Terms and Privacy Policy.</p>
      </form>
    </div>
  );
}


