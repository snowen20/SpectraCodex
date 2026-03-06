import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "What is SpectraCodex and what is vibecodeineering?",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">About SpectraCodex</h1>

      <div className="prose prose-invert max-w-none space-y-8 text-[#666666] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">What is this?</h2>
          <p>
            SpectraCodex is a curated directory of apps and tools built by
            vibecodeineers — people who prototype fast, ship often, and figure
            out the polish later. We release everything in drops: periodic
            batches of tools themed around what&apos;s actually getting built.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            What is vibecodeineering?
          </h2>
          <p>
            Vibecodeineering is the art and craft of building software by feel
            — using AI tools, no-code platforms, quick prototyping, and raw
            creativity to ship something real without overthinking the
            architecture. It&apos;s not about cutting corners. It&apos;s about
            trusting your instincts, moving fast, and learning what works by
            actually putting it in front of people.
          </p>
          <p className="mt-3">
            The best vibe-coded tools solve real problems, feel satisfying to
            use, and were built in a weekend (or an evening). That&apos;s the
            bar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            How does curation work?
          </h2>
          <ol className="list-none space-y-3">
            {[
              "Someone submits a tool via GitHub Issue with their launch kit.",
              "We review it: Is it live? Does it do something useful? Was it actually built (not just a landing page)?",
              "If it passes, it gets added to the queue for the next drop.",
              "Drops go out every few weeks, themed by what's shipping.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#7c3aed]/20 text-[#7c3aed] text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-3">
            Want to contribute?
          </h2>
          <p>
            If you built something, we want to hear about it.{" "}
            <Link href="/submit/" className="text-[#7c3aed] hover:underline">
              Submit your tool
            </Link>{" "}
            or join the newsletter to stay in the loop on upcoming drops and
            jams.
          </p>
        </section>
      </div>
    </div>
  );
}
