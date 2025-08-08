import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="p-5 flex justify-between items-center shadow border">
      <Image
        src={
          "https://s3.ca-central-1.amazonaws.com/logojoy/logos/227213901/noBgColor.png"
        }
        width={160}
        height={100}
        alt="logo"
      />
      <>
        <SignedOut>
          <SignInButton>
            {/* <Link href="/dashboard"> */}
            <button className="inline-block rounded border border-indigo-700 bg-indigo-700 px-4 py-[10px] font-medium text-white shadow-sm transition-colors hover:bg-indigo-800 cursor-pointer">
              Get Started
            </button>
            {/* </Link> */}
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </>
    </div>
  );
}

export default Header;
