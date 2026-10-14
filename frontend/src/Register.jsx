import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData
      );

      setMessage(response.data.message);
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: ''
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Registration failed. Check whether the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-center text-3xl font-bold text-blue-600">
          Create Your Account
        </h1>

        <p className="text-center text-gray-500">
          Register with BookEase
        </p>

        <input
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password (minimum 8 characters)"
          value={formData.password}
          onChange={handleChange}
          minLength={8}
          required
          className="w-full rounded-lg border p-3"
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone number (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {message && (
          <p role="status" className="text-center text-sm text-blue-700">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Register;