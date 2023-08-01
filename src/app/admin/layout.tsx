"use client"
import Sidebar from '../../components/Layout/Sidebar';
import { IconContext } from 'react-icons';
import { FaUserAlt } from 'react-icons/fa';
import React, { ReactNode } from 'react';

export interface LayoutAdminProps {
  children: ReactNode
}

const LayoutAdmin = ({ children }: LayoutAdminProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full shadow h-12 absolute bg-white flex items-center justify-between px-8 z-10">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-[30px] w-[30px] rounded-full overflow-hidden bg-[#FE7900] flex items-center justify-center">
            <IconContext.Provider
              value={{
                color: '#fff',
              }}
            >
              <div>
                <FaUserAlt size={15} />
              </div>
            </IconContext.Provider>
          </div>
          <div>Admin</div>
        </div>
      </div>
      <Sidebar />
      <div className="w-full h-full mt-10 p-8 overflow-y-auto ">
        <div className="pb-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
