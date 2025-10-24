'use client';

import PageHead from '@/components/commons/PageHead';
import { ReactNode } from 'react';

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const AuthLayout = (props: PropTypes) => {
  const { title, children } = props;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center py-10 bg-gray-100">
      <PageHead title={title} />
      <div className="absolute top-0 left-0 w-full h-[55%] bg-white rounded-b-[40px]" />
      <section className="relative z-10 max-w-screen-3xl 3xl:container flex flex-col items-center justify-center py-10 lg:py-0">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
