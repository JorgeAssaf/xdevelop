import { cookies } from 'next/headers';
import Link from 'next/link';
import User from '../user';

export default async function SiteHeader() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token');
  const navItems = [
    { label: 'Users', href: '/users' },
    { label: 'Posts', href: '/posts' },
    { label: 'Books', href: '/books' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">MyApp</span>
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Add user menu or buttons here if needed */}
            {
              token ? (
                <User />
              ) : (
                <Link href="/auth/sign-in" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
                  Login
                </Link>
              )
            }
          </div>
        </div>
      </nav>
    </header>
  );
}
