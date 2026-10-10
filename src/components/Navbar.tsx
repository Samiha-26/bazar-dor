import Image from "next/image";
import Navlinks from "./Navlinks";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="w-full bg-white">
    <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-3 font-semibold">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Image width={40} height={40} src="/logo-icon.png" alt="বাজার দর" />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-black">বাজার দর</h2>
            <p suppressHydrationWarning className="text-xs text-neutral-500">{date}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-sm">
          <button className="btn btn-active bg-white transition-colors hover:bg-gray-300">সাইন ইন</button>
          <button className="btn btn-active bg-green-700 p-2 text-white rounded-[6px]">
            সাইন আপ
          </button>
        </div>
      </div>

      <div className="mt-3 flex w-full items-center border-t border-gray-200 pt-3">
        
      <Navlinks />
      </div>
    </div>
    </div>
  );
};

export default Navbar;