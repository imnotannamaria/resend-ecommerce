export default function Orders() {
  return (
    <div className="p-2 flex flex-col gap-4">
      <div className='flex gap-4 justify-end'>
        <button className="cursor-pointer bg-zinc-900 text-zinc-200 py-2 px-4 rounded hover:text-zinc-300">Copy</button>
        <button className="cursor-pointer bg-zinc-900 text-zinc-200 py-2 px-8 rounded hover:text-zinc-300">Send</button>
      </div>

      <div className="grid grid-cols-[1fr_4fr_1fr] gap-4">
        <div className="w-full p-2 border border-zinc-200">
          variables
        </div>

        <div className="w-full p-2 border border-zinc-200">
          content
        </div>

        <div className="w-full p-2 border border-zinc-200">
          design changes
        </div>
      </div>
    </div>
  )
}