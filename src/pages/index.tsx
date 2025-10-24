import AuthLayout from '@/components/layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const TodoPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <h1 className="font-poppins font-extrabold text-5xl md:text-6xl text-[#0062FF] drop-shadow-md">
          Welcome to Todo App
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Manage your tasks efficiently and stylishly
        </p>

        <div className="mt-8">
          <Link href="/auth/login">
            <Button
              variant="default"
              className="px-8 py-4 text-lg font-semibold bg-[#0062FF] text-white hover:bg-[#0050cc] shadow-md transition-colors duration-200">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default TodoPage;
