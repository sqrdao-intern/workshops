'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Presentation component
const Presentation = dynamic(() => import('@/components/Presentation'), { ssr: false });

export default function Home() {
  return <Presentation />;
}
