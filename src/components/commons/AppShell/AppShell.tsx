import { cn } from '@/utils/cn';
import { Poppins, Roboto, Rubik } from 'next/font/google';
import { ReactNode } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rubik',
});

interface PropTypes {
  children: ReactNode;
}

const AppShell = ({ children }: PropTypes) => {
  return (
    <main
      className={cn(
        poppins.variable,
        roboto.variable,
        rubik.variable,
        'font-roboto'
      )}>
      {children}
    </main>
  );
};

export default AppShell;
