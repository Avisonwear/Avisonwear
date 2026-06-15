import Link from "next/link";
type Props = {
  title: string;
  children: React.ReactNode;
};

export default function LegalLayout({ title, children }: Props) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl w-full">
        <Link
  href="/"
  className="
  inline-flex
  items-center
  gap-2
  px-5
  py-3
  border
  border-white/10
  rounded-full
  text-zinc-400
  hover:text-white
  hover:border-white/30
  transition-all
  duration-300
  mb-12
  "
>
  ← Return to AVISON
</Link>

        <div className="text-center mb-16">
          <p className="text-green-400 tracking-[0.45em] uppercase mb-4">
            AVISON
          </p>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            {title}
          </h1>

          <div className="w-24 h-[2px] bg-white mx-auto mt-8" />
        </div>

        <div className="space-y-10 text-zinc-400 text-lg leading-relaxed">
          {children}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white font-semibold tracking-[0.25em] uppercase">
            Built From Ambition
          </p>
        </div>

      </div>
    </main>
  );
}