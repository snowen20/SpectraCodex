import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jam",
  description: "SpectraCodex Jam — coming soon. A vibe-coding challenge for builders.",
};

export default function JamPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center gap-2 bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#7c3aed] text-xs font-semibold px-3 py-1 rounded-full mb-8">
        Coming soon
      </div>

      <h1 className="text-4xl font-bold text-white mb-4">SpectraCodex Jam</h1>

      <p className="text-[#666666] text-lg leading-relaxed mb-4 max-w-xl mx-auto">
        A periodic vibe-coding challenge. A prompt drops. You have 48 hours to
        ship something real. The best tools get featured in the next drop.
      </p>

      <p className="text-[#444444] text-sm mb-12 max-w-md mx-auto">
        No judges, no prizes (yet). Just the satisfaction of shipping something
        fast and having people actually use it.
      </p>

      <div className="bg-[#111111] border border-[#222222] rounded-xl p-8 mb-8 max-w-md mx-auto">
        <h2 className="font-semibold text-white mb-2">How it will work</h2>
        <ul className="text-sm text-[#666666] text-left space-y-2 mt-4">
          <li className="flex gap-3">
            <span className="text-[#7c3aed]">→</span>
            A theme drops on Friday
          </li>
          <li className="flex gap-3">
            <span className="text-[#7c3aed]">→</span>
            You build and ship by Sunday
          </li>
          <li className="flex gap-3">
            <span className="text-[#7c3aed]">→</span>
            Submit via GitHub Issue
          </li>
          <li className="flex gap-3">
            <span className="text-[#7c3aed]">→</span>
            Best entries featured in the next drop
          </li>
        </ul>
      </div>

      <p className="text-[#666666] text-sm">
        Want to know when it launches?{" "}
        <Link href="/#newsletter" className="text-[#7c3aed] hover:underline">
          Join the newsletter
        </Link>
      </p>
    </div>
  );
}
