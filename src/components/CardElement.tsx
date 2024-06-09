import Image from "next/image";

interface CardProps {
  imageName: string;
  title: string;
  location: string;
  isDragging?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  imageName,
  location,
  isDragging,
}) => {
  return (
    <>
      {isDragging ? (
        <div className="max-w-15 rounded bg-white flex p-2">
          <Image
            src={`/images/${imageName}`}
            alt={imageName}
            width={16}
            height={16}
          />
          <div className="font-bold text-sm px-2">{title}</div>
        </div>
      ) : (
        <div className="max-w-sm rounded shadow-lg bg-white flex p-2">
          <Image
            src={`/images/${imageName}`}
            alt={imageName}
            width={112}
            height={112}
          />
          <div className="px-10 py-4">
            <div className="font-bold text-xl mb-4">{title}</div>
            <p className="text-gray-700 text-base">{location}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
