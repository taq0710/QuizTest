"use client"
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import React, { ReactNode } from 'react';

export interface LayoutUserProps {
  children: ReactNode
}

export default function LayoutUser({ children }: LayoutUserProps) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}