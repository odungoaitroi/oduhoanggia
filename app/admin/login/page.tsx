'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@odudaiphat.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Đăng nhập thất bại');
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={login} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <p className="font-bold uppercase tracking-widest text-orange-500">Ô Dù Đại Phát Admin</p>
        <h1 className="mt-2 text-3xl font-black">Đăng nhập quản trị</h1>
        <p className="mt-3 text-sm text-slate-600">Khu vực quản trị sản phẩm, ảnh WebP, đơn báo giá và SEO.</p>
        <label className="mt-6 block text-sm font-bold">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border px-4 py-3" />
        <label className="mt-4 block text-sm font-bold">Mật khẩu</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border px-4 py-3" />
        {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-600">{error}</p>}
        <button disabled={loading} className="mt-6 w-full rounded-full bg-blue-700 px-6 py-4 font-black text-white hover:bg-blue-800 disabled:opacity-60">
          {loading ? 'Đang đăng nhập...' : 'Vào admin'}
        </button>
      </form>
    </main>
  );
}
