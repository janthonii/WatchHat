import Image from "next/image";
import logo from '@/assets/A-HAT_Logo_Big.svg';

export default function Home() {
  return (
    <div className="grid grid-rows-[5px_1fr_5px] items-start justify-items-center min-h-screen p-8 pb-20 gap-5 sm:p-10">
      <main className="flex flex-col gap-[35px] row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-2 justify-center items-center">
          <Image src={logo} alt="WatchHat logo" height={170} />
          <div className="pt-10 wrap-break-word text-[50px] bg-gradient-to-r from-darkdeep-green via-transition-green to-creamy-white text-transparent bg-clip-text font-bold">
          WatchHat
          </div>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <ol className="text-center text-[20px] outline-3 outline-black bg-warm-gray p-10 rounded-xl font-bold text-base/12">
            <li>Search your movies!</li>
            <li>Have personal lists of movies to watch!</li>
            <li>Have lists of movies ready for you and your friends to watch!</li>
          </ol>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-start font-bold border-t-1 border-white">
        @WatchHat
      </footer>
    </div>
  );
}