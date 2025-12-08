import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        <div
          className="border border-zinc-800 
        
        bg-zinc-900/50 p-6 backdrop-blur-md"
        >
          <div className="space-y-5">
            <div className="space-y-2">Create Room</div>
          </div>
        </div>
      </div>
    </main>
  );
}
