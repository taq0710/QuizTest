import Link from 'next/link';
import React, { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BsPatchQuestion } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoLogOutOutline } from 'react-icons/io5';

const items = [
  {
    name: 'Dashboard',
    icon: <AiOutlineDashboard />,
    path: "admin/dashboard",
  },
  {
    name: 'Quiz',
    icon: <BsPatchQuestion />,
    path: "admin/quiz",
  },
  {
    name: 'User',
    icon: <HiOutlineUserGroup />,
    path: "admin/user",
  },
];

const Sidebar = () => {

  return (
    <div className="flex flex-col h-screen p-3 bg-white shadow w-60 pt-12">
      <div className="space-y-3 h-full">
        <div className="flex items-center">{/* <h2 className="text-xl font-bold">Dashboard</h2> */}</div>
        <div className="flex flex-col justify-between h-full">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {items.map((item) => {
              return (
                <li
                  className={`rounded-sm hover:bg-orange-200 transition ${location.pathname === item.path ? 'bg-orange-100' : ''}`}
                  key={item.name}
                >
                  <Link href={item.path} className="flex items-center p-2 space-x-3 rounded-md">
                    <IconContext.Provider
                      value={{
                        color: '#000000',
                        size: '28px',
                      }}
                    >
                      <div>{item.icon}</div>
                    </IconContext.Provider>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={`rounded-sm hover:bg-orange-200 transition mb-4`}>
            <Link href={'#'} className="flex items-center p-2 space-x-3 rounded-md">
              <IconContext.Provider
                value={{
                  color: '#000000',
                  size: '28px',
                }}
              >
                <div>
                  <IoLogOutOutline />
                </div>
              </IconContext.Provider>
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
