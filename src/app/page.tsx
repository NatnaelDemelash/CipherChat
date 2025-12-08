'use client';

import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const ANIMALS = ['wolf', 'hawk', 'bear', 'shark'];
const STORAGE_KEY = 'chat_username';

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];

  return `anonymous-${word}-${nanoid(5)}`;
};

export default function Home() {
  // Initialize with null to indicate no value is loaded yet.
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // This code block runs only on the client side after the initial render.
    const main = () => {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setUsername(stored);
        return;
      }

      const generated = generateUsername();
      localStorage.setItem(STORAGE_KEY, generated);

      setUsername(generated);
    };

    main();
  }, []);

  // Conditionally render a placeholder during the initial SSR render
  // and client hydration phase before useEffect completes.
  const displayUsername = username || '...';

  // Clean the className string to avoid the whitespace/newline mismatch error
  const cardClassName =
    'border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md';

  return (
    <main className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Use the cleaned className variable */}
        <div className={cardClassName}>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center  text-zinc-500">
                Your Identity
              </label>

              <div className="flex items-center gap-3">
                <div className="border border-zinc-850 bg-zinc-950 w-full px-3 py-2 mt-2 text-zinc-400 font-mono">
                  {/* Use the displayUsername variable */}
                  {displayUsername}
                </div>
              </div>
            </div>

            <button
              className="w-full mt-8 bg-zinc-100 py-3 cursor-pointer flex items-center justify-center text-zinc-950"
              // Disable the button if the username is still null (loading)
              disabled={username === null}
            >
              JOIN ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
