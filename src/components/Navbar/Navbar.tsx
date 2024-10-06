import Link from 'next/link';
export default function NavBar() {
  return (
    <div className="flex w-full bg-yellow-400 justify-between p-4">
      <Link href="/today">Today</Link>
      <Link href="/daily">Daily</Link>
      <Link href="/weekly">Weekly</Link>
    </div>
  );
}
