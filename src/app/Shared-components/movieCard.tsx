import Image from "next/image";

interface MovieCardProps {
  title: string;
  posterPath: string | null;
  releaseDate: string;
}

export default function MovieCard({ title, posterPath, releaseDate }: MovieCardProps) {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "/placeholder.jpg"; 

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
      <Image
        src={imageUrl}
        alt={title}
        width={500}
        height={750}
        className="w-full h-72 object-cover"
      />
      <div className="p-3">
        <h2 className="text-lg font-semibold truncate">{title}</h2>
        <p className="text-sm text-gray-600">Released: {releaseDate}</p>
      </div>
    </div>
  );
}
