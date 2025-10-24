'use client';

import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/utils/cn';
import { useSession } from 'next-auth/react';

const MemberLayoutNavbar = () => {
  const { data: session } = useSession();
  return (
    <header
      className={cn(
        'flex items-center justify-between w-full border-b bg-white px-6 py-2 shadow-sm dark:bg-background'
      )}>
      <div className="flex items-center w-1/3">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search (Ctrl + /)"
            className="w-full pl-8 text-sm bg-transparent shadow-none border-none focus-visible:ring-0"
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            ★
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {session?.user?.fullName}
        </span>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="/images/sample_profile.png"
            alt={session?.user?.fullName}
          />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default MemberLayoutNavbar;
