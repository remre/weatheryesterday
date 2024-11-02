import Link from 'next/link';
export default function NavBar() {
  return (
    <section className="flex w-full bg-yellow-200 justify-between p-4 text-xl">
      <Link href="/today">Today</Link>
      <Link href="/daily">Hourly</Link>
      <Link href="/weekly">Daily</Link>
    </section>
  );
}
