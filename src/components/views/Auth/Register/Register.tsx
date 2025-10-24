'use client';

import { Controller } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import {
  FloatingInput,
  FloatingLabel,
} from '@/components/ui/floating-label-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useRegister from './useRegister';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Register = () => {
  const { control, visiblePassword, handleVisiblePassword, errors } =
    useRegister();
  return (
    <div className="w-full max-w-[680px] mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-5 text-[#44444F] font-poppins">
          Register
        </h1>
        <p className="text-base text-gray-500">
          Let&apos;s Sign up first for enter into Square Website. Uh She Up!
        </p>
      </div>

      <Card>
        <CardContent className="px-8 py-4">
          <form onSubmit={() => {}} className="space-y-5">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <div className="relative">
                      <FloatingInput
                        {...field}
                        id="firstName"
                        className={cn(
                          'border-gray-300 ',
                          errors.firstName && 'border-red-500'
                        )}
                      />
                      <FloatingLabel htmlFor="firstName">
                        First Name
                      </FloatingLabel>
                    </div>

                    {errors.firstName && (
                      <p className="text-xs text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <div className="relative">
                      <FloatingInput
                        {...field}
                        id="lastName"
                        className={cn(
                          'border-gray-300 ',
                          errors.lastName && 'border-red-500'
                        )}
                      />
                      <FloatingLabel htmlFor="lastName">
                        Last Name
                      </FloatingLabel>
                    </div>

                    {errors.lastName && (
                      <p className="text-xs text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Phone Number & Country */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-row items-center gap-1">
                    <div className="border rounded-md p-3.5 border-secondary">
                      <p className="text-sm text-secondary">+62</p>
                    </div>
                    <div className="relative">
                      <FloatingInput
                        {...field}
                        id="phoneNumber"
                        className={cn(errors.phoneNumber && 'border-red-500')}
                      />
                      <FloatingLabel htmlFor="phoneNumber">
                        Phone Number
                      </FloatingLabel>
                    </div>

                    {errors.phoneNumber && (
                      <p className="text-xs text-red-500">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className={cn(
                        'h-14 w-full border-gray-200',
                        !field.value && 'text-gray-400'
                      )}>
                      <SelectValue placeholder="Your Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indonesia">Indonesia</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="malaysia">Malaysia</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Mail Address */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <div className="relative">
                    <FloatingInput
                      {...field}
                      id="email"
                      type="email"
                      className={cn(
                        'border-gray-300 ',
                        errors.email && 'border-red-500'
                      )}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2  text-sm select-none">
                      @squareteam.com
                    </span>
                    <FloatingLabel htmlFor="email">Mail Address</FloatingLabel>
                  </div>

                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <div className="relative">
                      <FloatingInput
                        {...field}
                        id="floating-customize"
                        type={visiblePassword.password ? 'text' : 'password'}
                        className={cn(errors.password && 'border-red-500')}
                      />
                      <FloatingLabel htmlFor="floating-customize">
                        Password
                      </FloatingLabel>
                      <button
                        type="button"
                        onClick={() => handleVisiblePassword('password')}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                        {visiblePassword.password ? <FaEyeSlash /> : <FaEye />}
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
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <div className="relative">
                      <FloatingInput
                        {...field}
                        id="confirmPassword"
                        type={
                          visiblePassword.confirmPassword ? 'text' : 'password'
                        }
                        className={cn(
                          errors.confirmPassword && 'border-red-500'
                        )}
                      />
                      <FloatingLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FloatingLabel>
                      <button
                        type="button"
                        onClick={() => handleVisiblePassword('confirmPassword')}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                        {visiblePassword.confirmPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
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
            </div>

            {/* Tell us about yourself */}
            <Controller
              name="aboutYourself"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <Label htmlFor="aboutYourself">Tell us about yourself</Label>
                  <Textarea
                    {...field}
                    placeholder="Hello my name..."
                    id="aboutYourself"
                    className={cn(
                      'min-h-24',
                      errors.aboutYourself && 'border-red-500'
                    )}
                  />
                </div>
              )}
            />

            {/* Buttons */}
            <div className="w-full flex gap-2.5 mt-[70px]">
              <Button type="button" variant="default" className="h-12 w-1/3">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                type="submit"
                className="h-12 w-2/3 bg-blue-600 hover:bg-blue-700 text-white">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
