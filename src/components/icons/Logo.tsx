import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2Flogo_vempreender.png?alt=media&token=b13f9567-e302-48ca-973a-d63a19daa17d"
        alt="Vempreender AI Logo"
        width={120}
        height={24}
        className="object-contain"
        priority
      />
    </div>
  );
}
