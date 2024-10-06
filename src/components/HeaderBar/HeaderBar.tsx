export default function HeaderBar() {
  return (
    <div className="flex flex-row space-x-1 min-h-[40px] items-center bg-white ">
      <div>logo</div>
      <div className="w-[300px] bg-green-400">searchbar</div>
      <div className="flex w-full text-center  justify-center">Header</div>
    </div>
  );
}
