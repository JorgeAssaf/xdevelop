'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type SignInInput = {
  email: string;
  password: string;
};

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({ email, password }: SignInInput) => {
      if (!email || !password) {
        throw new Error('Ingresa tu email y contraseña.');
      }
      try {
        const res = await fetch('https://reqres.in/api/register', {
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
        throw new Error(error instanceof Error ? error.message : 'Error de red. Por favor, intenta de nuevo.');

      }
    },
    onSuccess: () => {
      setPassword('');
      router.push('/');
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

      {mutation.isError && (
        <p className="text-sm text-red-600" role="alert">
          {(mutation.error as Error)?.message || 'Error al iniciar sesión.'}
        </p>
      )}

      {mutation.isSuccess && (
        <p className="text-sm text-green-600">Sesión iniciada correctamente.</p>
      )}

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
