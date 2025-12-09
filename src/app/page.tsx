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
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
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

  const displayUsername = username || '...';

  const cardClassName =
    'border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md rounded-lg shadow-2xl';

  return (
    <main className="flex flex-col justify-center items-center min-h-screen p-4 bg-zinc-950 bg-radial-gradient">
      <div className="w-full max-w-md space-y-8">
        {/* ENHANCEMENT: Title with a strong tracking and an icon */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-amber-400 tracking-widest uppercase">
            &#128274; PRIVATE_CHAT
          </h1>
        </div>

        <p className="text-zinc-400 text-center text-sm">
          A Private, secure, self-destructing chat room.
        </p>

        <div className={cardClassName}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500 text-sm font-medium">
                Your Identity
              </label>

              <div className="flex items-center gap-3">
                {/* ENHANCEMENT: Use a transition for the loading state */}
                <div
                  className={`border border-zinc-850 bg-zinc-950 w-full px-4 py-3 text-zinc-400 font-mono transition-colors duration-300 ${
                    username === null
                      ? 'animate-pulse text-zinc-600'
                      : 'text-zinc-300'
                  }`}
                >
                  {displayUsername}
                </div>
              </div>
            </div>

            {/* ENHANCEMENT: Use the amber accent color for the button and add hover/disabled styles */}
            <button
              className="w-full mt-8 py-3 font-semibold rounded transition-all duration-200 ease-in-out text-zinc-950 bg-amber-400 hover:bg-amber-300 disabled:bg-zinc-700 disabled:text-zinc-500 cursor-pointer disabled:cursor-not-allowed"
              disabled={username === null}
            >
              CREATE SECURE CONNECTION
            </button>
          </div>
        </div>

        {/* ENHANCEMENT: Footer/Context line */}
        <p className="text-zinc-600 text-xs text-center pt-4">
          Identity is generated locally and stored in your browser.
        </p>
      </div>
    </main>
  );
}
