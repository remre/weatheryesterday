import Link from 'next/link';
export default function NavBar() {
  return (
    <div className="flex w-full bg-yellow-400 justify-between p-4 text-xl">
      <Link href="/today">Today</Link>
      <Link href="/daily">Hourly</Link>
      <Link href="/weekly">Daily</Link>
    </div>
  );
}
