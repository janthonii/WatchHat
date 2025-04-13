import Image from "next/image";
import logo from '@/assets/A-HAT_Logo.svg';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-2 justify-center">
          <Image src={logo} alt="WatchHat logo" />
        WatchHat
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <ol className="text-center bg-warm-gray">
            <li>Rank your movies!</li>
            <li>Get your best fit movies based on your rankings!</li>
            <li>Have personal lists of movies to watch!</li>
            <li>Have shared lists of movies for you and your friends to watch!</li>
          </ol>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-start">
        @WatchHat
      </footer>
    </div>
  );
}
