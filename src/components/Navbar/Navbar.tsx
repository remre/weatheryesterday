import Link from 'next/link';

export default function NavBar() {
  return (
    <section className="sm:mx-0 mx-2 flex flex-col md:flex-row w bg-orange-400 opacity-90 justify-between p-4 text-xl space-y-4 md:space-y-0 md:space-x-4 items-center md:items-start">
      <Link href="/today" className="text-white hover:text-gray-200">
        Today
      </Link>
      <Link href="/hourly" className="text-white hover:text-gray-200">
        Hourly
      </Link>
      <Link href="/daily" className="text-white hover:text-gray-200">
        Daily
      </Link>
    </section>
  );
}
