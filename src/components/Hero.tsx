import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    });
    return (
        <section className="mx-auto max-w-7xl px-4 py-6">
            <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-4xl bg-white px-6 py-10 sm:px-10 md:grid-cols-2 md:px-14 md:py-16">

              {/* Left Content */}
<div className="flex flex-col items-start gap-6">
    {/* Eyebrow text */}
    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
      {date}
    </span>

    <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl">
        আজকের বাজারের দাম এক নজরে
    </h1>

    <p className="max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
        এবং দামের পরিবর্তন এক জায়গায়।
    </p>

    <Link
        href="#সব-পণ্য"
        className="rounded-md bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
    >
        সব পণ্য দেখুন →
    </Link>
</div>


                {/* Right Image */}
                <div className="flex justify-center md:justify-end">
                    <Image
                        src="/bazar-hero.png"
                        alt="বাজারের পণ্য"
                        width={400}
                        height={400}
                        priority
                        className="h-auto w-full max-w-[300px] object-contain sm:max-w-[350px] md:max-w-[400px]"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;