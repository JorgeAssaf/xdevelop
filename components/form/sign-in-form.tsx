'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { toast } from 'sonner';
type SignInInput = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ email, password }: SignInInput) => {
      if (!email || !password) {
        throw new Error('Ingresa tu email y contraseña.');
      }
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-api-key": "reqres-free-v1",
          },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error);
        }
        return res.json();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Error de red. Por favor, intenta de nuevo.');
        throw new Error(error instanceof Error ? error.message : 'Error de red. Por favor, intenta de nuevo.');
      }
    },
    onSuccess(data,) {
      Cookies.set('token', data.token || '', {
        // en un minuto
        expires: new Date(Date.now() + 60 * 1000),
        secure: true,
        sameSite: 'Lax',
      });
      toast.success('Sesión iniciada correctamente.');
      router.push('/dashboard');
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ email: email.trim(), password });
  };

  const isDisabled = mutation.isPending || !email || !password;

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          inputMode="email"
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(mutation.isError)}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          required
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='flex justify-between'>
        <p className='text-sm'>
          No tienes una cuenta?
        </p>
        <span> <Link href="/auth/sign-up" className="text-primary hover:underline text-sm">Regístrate</Link></span>
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}
