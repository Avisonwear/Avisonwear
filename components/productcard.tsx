import Link from "next/link";

type ProductCardProps = {
  name: string;
  price: string;
  image: string;
  link: string;
};

export default function ProductCard({
  name,
  price,
  image,
  link,
}: ProductCardProps) {
  return (
    <Link
      href={link}
      className="
      relative
      block
      group
      bg-zinc-950
      border
      border-white/10
      rounded-3xl
      overflow-hidden
      transition-all
      duration-300
      hover:border-white/30
      hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]
    "
    >
      <div className="absolute top-4 left-4 z-20 px-5 py-2 rounded-full bg-white text-black text-sm font-bold tracking-wider">
        LIMITED DROP
      </div>

      <div className="h-[500px] flex items-center justify-center bg-black">
        <img
          src={image}
          alt={name}
          className="
            max-h-full
            max-w-full
            object-contain
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black">
          {name}
        </h3>

        <p className="text-gray-400 mt-2">
          Premium Oversized Fit
        </p>
        <p className="text-2xl font-black mt-4">
  {price}
</p>

        <div className="flex gap-2 mt-4">
          <span className="px-5 py-2 text-xs border border-white/20 rounded-full">S</span>
          <span className="px-5 py-2 text-xs border border-white/20 rounded-full">M</span>
          <span className="px-5 py-2 text-xs border border-white/20 rounded-full">L</span>
          <span className="px-5 py-2 text-xs border border-white/20 rounded-full">XL</span>
        </div>

        <div
  className="
  w-full
  mt-6
  px-8
  py-4
  rounded-full
  bg-white
  text-black
  font-black
  tracking-[0.15em]
  text-center
  "
>
  VIEW PRODUCT →
</div>
      </div>
    </Link>
  );
}