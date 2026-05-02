'use client';

import { useMemo, useState } from 'react';

type ProductRow = any;
type Category = { slug: string; name: string };

const emptyProduct = {
  slug: '',
  name: '',
  category: 'du-cafe',
  price: 'Liên hệ',
  size: '',
  material: '',
  image: '/images/du-cafe-vuong-2m5.webp',
  badge: 'Mới',
  shortDescription: '',
  description: '',
  applications: ['Quán cafe'],
  keywords: ['ô dù ngoài trời'],
  isPublished: true,
  sortOrder: 0
};

function toSlug(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function parseArray(value: string) {
  return value.split(',').map((x) => x.trim()).filter(Boolean);
}

export default function AdminProductsClient({ initialProducts, categories }: { initialProducts: ProductRow[]; categories: Category[] }) {
  const [products, setProducts] = useState<ProductRow[]>(initialProducts);
  const [form, setForm] = useState<any>(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const sortedProducts = useMemo(() => [...products].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)), [products]);

  function edit(p: ProductRow) {
    setEditingId(p.id);
    setForm({
      ...p,
      applications: JSON.parse(p.applications || '[]'),
      keywords: JSON.parse(p.keywords || '[]')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    const payload = {
      ...form,
      slug: form.slug || toSlug(form.name),
      applications: Array.isArray(form.applications) ? form.applications : parseArray(form.applications),
      keywords: Array.isArray(form.keywords) ? form.keywords : parseArray(form.keywords),
      sortOrder: Number(form.sortOrder || 0)
    };
    const res = await fetch(editingId ? `/api/admin/products/${editingId}` : '/api/admin/products', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      setMessage('Lưu thất bại. Kiểm tra dữ liệu hoặc slug bị trùng.');
      return;
    }
    const data = await res.json();
    if (editingId) setProducts((items) => items.map((p) => p.id === editingId ? data.data : p));
    else setProducts((items) => [data.data, ...items]);
    setForm(emptyProduct);
    setEditingId(null);
    setMessage('Đã lưu sản phẩm.');
  }

  async function remove(id: string) {
    if (!confirm('Xóa sản phẩm này?')) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    if (res.ok) setProducts((items) => items.filter((p) => p.id !== id));
  }

  async function upload(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setForm((f: any) => ({ ...f, image: data.url }));
    else setMessage(data.error || 'Upload thất bại');
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={save} className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200 ring-1 ring-slate-100">
        <h1 className="text-3xl font-black">{editingId ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h1>
        <div className="mt-5 grid gap-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.slug || toSlug(e.target.value) })} className="rounded-2xl border px-4 py-3" placeholder="Tên sản phẩm" />
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: toSlug(e.target.value) })} className="rounded-2xl border px-4 py-3" placeholder="slug-seo" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-2xl border px-4 py-3">
            {categories.map((c) => <option value={c.slug} key={c.slug}>{c.name}</option>)}
          </select>
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-2xl border px-4 py-3" placeholder="Giá" />
            <input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="rounded-2xl border px-4 py-3" placeholder="Kích thước" />
          </div>
          <input value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className="rounded-2xl border px-4 py-3" placeholder="Chất liệu" />
          <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="rounded-2xl border px-4 py-3" placeholder="/images/ten-file.webp" />
          <input type="file" accept="image/webp" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} className="rounded-2xl border px-4 py-3" />
          <input value={form.badge || ''} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="rounded-2xl border px-4 py-3" placeholder="Badge" />
          <textarea value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="h-24 rounded-2xl border px-4 py-3" placeholder="Mô tả ngắn" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="h-32 rounded-2xl border px-4 py-3" placeholder="Mô tả chi tiết SEO" />
          <input value={Array.isArray(form.applications) ? form.applications.join(', ') : form.applications} onChange={(e) => setForm({ ...form, applications: e.target.value })} className="rounded-2xl border px-4 py-3" placeholder="Ứng dụng, cách nhau dấu phẩy" />
          <input value={Array.isArray(form.keywords) ? form.keywords.join(', ') : form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} className="rounded-2xl border px-4 py-3" placeholder="Keyword SEO, cách nhau dấu phẩy" />
          <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} /> Hiển thị sản phẩm</label>
          <button className="rounded-full bg-blue-700 px-6 py-4 font-black text-white hover:bg-blue-800">{editingId ? 'Cập nhật' : 'Thêm sản phẩm'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyProduct); }} className="rounded-full bg-slate-100 px-6 py-3 font-black text-slate-700">Hủy sửa</button>}
          {message && <p className="rounded-2xl bg-blue-50 p-3 text-sm font-bold text-blue-700">{message}</p>}
        </div>
      </form>

      <section className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200 ring-1 ring-slate-100">
        <h2 className="text-3xl font-black">Danh sách sản phẩm</h2>
        <div className="mt-5 max-h-[820px] space-y-3 overflow-auto pr-2">
          {sortedProducts.map((p) => (
            <div key={p.id} className="flex gap-4 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
              <img src={p.image} alt={p.name} className="h-20 w-24 rounded-xl object-cover" />
              <div className="flex-1">
                <b>{p.name}</b>
                <p className="text-sm text-slate-500">/{p.slug}</p>
                <p className="text-sm text-slate-500">{p.category} • {p.size} • {p.isPublished ? 'Đang hiện' : 'Đang ẩn'}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => edit(p)} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700">Sửa</button>
                <button onClick={() => remove(p.id)} className="rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-600">Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
