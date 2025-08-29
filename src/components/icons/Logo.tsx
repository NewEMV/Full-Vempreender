import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center w-20 ${className}`}>
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/cb-vempreender.firebasestorage.app/o/Imagens%20LP%2Flogo_vempreender.webp?alt=media&token=a98bbda2-4c3a-4933-8e90-873de1a44422"
        alt="Vempreender AI Logo"
        width={120}
        height={24}
        className="h-auto w-full object-contain"
        priority
      />
    </div>
  );
}
