'use client';
import { titleFont } from '@/config/fonts';
import { useSession } from 'next-auth/react';
import React from 'react';
import User from './user';
import { Inbox } from 'lucide-react';
import InboxComponent from './inbox/inbox';
import { useGetAllRequest } from '@/hooks';

const Nav = () => {
  const { data: session, status } = useSession();
  const { allRequests } = useGetAllRequest();
  console.log(allRequests);
  let userInfo;

  if (status === 'loading') {
    userInfo = (
      <div className="flex items-center justify-center space-x-4">
        <div className="mr-4 animate-pulse w-64 h-6 bg-gray-200 rounded-full"></div>
      </div>
    );
  } else if (status === 'authenticated' && session?.user) {
    userInfo = session.user.email || session.user.name || 'Usuario';
  }

  return (
    <div className="flex justify-between pr-4">
      <div
        className={`hidden sm:block ml-3 text-2xl antialiased font-bold ${titleFont.className}`}
      >
        Recursos Humanos Nandayure
      </div>
      <div className="flex items-center space-x-4">
        <span className="mr-4">{userInfo}</span>
        <InboxComponent />
        <User />
      </div>
    </div>
  );
};

export default Nav;
