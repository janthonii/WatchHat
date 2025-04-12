import Image from 'next/image';
import Welcome from '@/components/Welcome';
import bgarch from '@/assets/UGAbw-arch.jpg';

const Content = () => {

    return (
        <div className="relative w-full h-screen">
            <Image 
                src={bgarch}
                alt="Background UGA arch" 
                fill
                priority={true}
            />
            <Welcome />
           
        </div>
    );
};

export default Content;
