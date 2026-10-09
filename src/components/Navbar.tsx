import Image from "next/image";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">

    <div className="flex items-center gap-2">
        <Image
            width={40}
            height={40}
            src="/logo-icon.png"
            alt="বাজার দর"
        />

        <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-black">
                বাজার দর
            </h2>
            <p className="text-xs text-neutral-500">
                {date}
            </p>
        </div>
    </div>

    <div className="flex shrink-0 items-center gap-2">
        <button className="btn btn-active bg-white">
            সাইন ইন
        </button>

        <button className="btn btn-active bg-green-700 text-white p-2">
            সাইন আপ
        </button>
    </div>

</div>
  );
};

export default Navbar;
