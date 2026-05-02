import { site } from '@/lib/site';

export function FloatingCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a href={`tel:${site.phone}`} className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-xl text-white shadow-2xl transition hover:scale-105" aria-label="Gọi điện Ô Dù Đại Phát">☎</a>
      <a href={`https://zalo.me/${site.phone}`} className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-xl text-white shadow-2xl transition hover:scale-105" aria-label="Chat Zalo Ô Dù Đại Phát">💬</a>
    </div>
  );
}
