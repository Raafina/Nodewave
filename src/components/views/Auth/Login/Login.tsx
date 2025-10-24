'use client';

import Link from 'next/link';
import { Controller } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/utils/cn';
import useLogin from './useLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  FloatingInput,
  FloatingLabel,
} from '@/components/ui/floating-label-input';

const Login = () => {
  const {
    visiblePassword,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div>
      <div className="text-center mb-3.5 pb-10">
        <h1 className="text-[56px] font-bold text-[#44444F] font-poppins">
          Sign In
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Just sign in if you have an account here. Enjoy our Website
        </p>
      </div>
      <Card>
        <CardContent className="px-8 py-4">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <div className="relative">
                    <FloatingInput
                      {...field}
                      id="floating-customize"
                      className={cn(errors.email && 'border-red-500')}
                    />
                    <FloatingLabel htmlFor="floating-customize">
                      Your Email / Username
                    </FloatingLabel>
                  </div>

                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <div className="relative">
                    <FloatingInput
                      {...field}
                      id="floating-customize"
                      type={visiblePassword ? 'text' : 'password'}
                      className={cn(errors.password && 'border-red-500')}
                    />
                    <FloatingLabel htmlFor="floating-customize">
                      Enter Password
                    </FloatingLabel>
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                      {visiblePassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex items-center justify-between text-sm">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-gray-600 text-sm">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                    Remember Me
                  </label>
                )}
              />

              <Link
                href="/forgot-password"
                className="text-secondary hover:underline text-sm">
                Forgot Password
              </Link>
            </div>
            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:opacity-90 text-white">
              {isPendingLogin ? 'Login...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="mt-6 text-center text-sm text-primary ">
        Already have an Square account?{' '}
        <Link href="/auth/register" className="hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Login;
