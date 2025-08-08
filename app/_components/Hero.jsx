import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className=" bg-gray-50 flex items-center flex-col">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Manage Your Expenxes <br />
            <strong className="text-indigo-700">Control Your Money</strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Start creating your budget and save ton of money
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <Link
              className="inline-block rounded border border-indigo-700 bg-indigo-700 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-800"
              href="/dashboard"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="border rounded-lg shadow mb-5">
        <Image
          className="rounded-lg"
          src={"/dashboard.png"}
          width={1000}
          height={700}
          alt="dashboard"
        />
      </div>
    </section>
  );
}

export default Hero;
