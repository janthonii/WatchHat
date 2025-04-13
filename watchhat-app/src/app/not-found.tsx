import errorImage from '@/assets/404-image.png';
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-[#142024]">
      {/* Error Text with #FBE9D0 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#FBE9D0]">404 - Page Not Found</h1>
        <p className="text-lg text-[#FBE9D0]/90">
          The page you're looking for doesn't exist.
        </p>
      </div>

      {/* Image */}
      <div className="w-full max-w-xs md:max-w-md">
        <Image
          src={errorImage}
          alt="404 ugly creature image"
          width={400}
          height={300}
          className="w-full h-auto"
        />
      </div>

      {/* Home Button with #E64833 */}
      <Link
        href="/"
        className="px-8 py-3 bg-[#E64833] text-white rounded-[40px] hover:bg-[#E64833]/90 transition-colors text-lg font-medium shadow-lg hover:shadow-[#E64833]/30 active:scale-95"
      >
        Take Me Home :&lt;
      </Link>
    </div>
  )
}