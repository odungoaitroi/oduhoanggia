import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/password';
import { setAdminSession } from '@/lib/auth';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function POST(request: Request) {
  const body = schema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: 'Dữ liệu đăng nhập không hợp lệ' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: body.data.email } });
  if (!user || !verifyPassword(body.data.password, user.passwordHash)) {
    return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
  }

  await setAdminSession(user.id);
  return NextResponse.json({ ok: true, user: { email: user.email, name: user.name, role: user.role } });
}
