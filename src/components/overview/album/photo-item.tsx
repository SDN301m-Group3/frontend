import Link from 'next/link';
import Image from 'next/image';

type PhotoItemProps = {
    image: string;
    _id: string;
};

const PhotoItem = ({ image, _id }: PhotoItemProps) => {
    return (
        <>
            <div>
                <Link href={`/photo/${_id}`}>
                    <div className={`group relative cursor-pointer`}>
                        <Image
                            src={image}
                            width={1000}
                            height={1000}
                            // objectFit="cover"
                            // objectPosition="50%,50%"
                            alt="Photo"
                        />
                    </div>
                </Link>
            </div>
        </>
    );
};
export default PhotoItem;
