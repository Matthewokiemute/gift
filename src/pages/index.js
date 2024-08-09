
import Hero from '@/components/Hero';
import PageLayout from '@/components/PageLayout';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`min-h-screen overflow-hidden`}
    >
      <PageLayout>
        <Hero />
      </PageLayout>
    </main>
  );
}
