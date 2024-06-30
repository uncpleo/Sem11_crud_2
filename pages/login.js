import { useState } from 'react';
import { useRouter } from 'next/router';
import './styles/main.css';

async function authenticate(username, password) {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  }
  throw new Error('Authentication failed');
}

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authenticate(form.username, form.password);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/home');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} className='loginform'>
      <div className='div-container'>
            <h2>Ingresar a el Aplicativo</h2>
        </div>
        <div className='div-container'>
          <label >Username:</label>
          <input className='form-input1' type="text" name="username" value={form.username} onChange={handleChange} />
        </div>
        <div className='div-container'>
          <label >Password:</label>
          <input className='form-input1' type="password" name="password" value={form.password} onChange={handleChange} />
        </div>
        <div className='div-container'>
        {error && <p>{error}</p>}
        <button className='main-button' type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
