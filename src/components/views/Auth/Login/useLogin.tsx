import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ILogin } from '@/types/Auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

const useLogin = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const toggleVisibility = () => setVisiblePassword(!visiblePassword);

  const callbackUrl: string = (router.query.callbackUrl as string) || '/';

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn('credentials', {
      ...payload,
      redirect: false,
      callbackUrl: '/admin/dashboard',
    });
    if (result?.error && result?.status === 401) {
      throw new Error('Your login credentials are incorrect');
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError(error) {
      setError('root', {
        message: error.message || 'Invalid login credentials',
      });
      toast.error(error.message || 'Invalid login credentials');
    },
    onSuccess: () => {
      reset();
      router.push(callbackUrl);
      toast.success('Login success');
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    visiblePassword,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
