import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Submit",
  description: "Submit your vibe-coded app or tool to SpectraCodex.",
};

const GITHUB_OWNER = "snowen20";
const GITHUB_REPO = "spectracodex";

const requirements = [
  {
    title: "One-line pitch",
    description: "Max 120 characters. Describe what your tool does, not what it is.",
  },
  {
    title: "Who it's for",
    description: "One specific audience. 'Developers who need X' is better than 'anyone'.",
  },
  {
    title: "Problem it solves",
    description: "One sentence. What painful thing does your tool make fast, easy, or free?",
  },
  {
    title: "Primary CTA link + label",
    description: 'A live URL and a button label like "Try it free", "Play now", or "Get started".',
  },
  {
    title: "Price model",
    description: "Honest answer: free, freemium, or paid.",
  },
  {
    title: "Thumbnail image",
    description: "400×300px image showing the tool. Can be a screenshot or a designed card.",
  },
  {
    title: "2 screenshots (or 1 GIF)",
    description: "Show the tool in actual use. Placeholder images will be rejected.",
  },
  {
    title: "30-second demo script",
    description: "4 bullet points walking someone through the core flow in order.",
  },
  {
    title: "Contact email + permission",
    description: "Your email and confirmation that we can feature your tool in SpectraCodex.",
  },
];

export default function SubmitPage() {
  const issueUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/issues/new?template=submission.md&title=Submission%3A+%5BYour+Tool+Name%5D`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Submit Your Tool</h1>
        <p className="text-[#666666] leading-relaxed">
          Get your vibe-coded app, tool, or game featured in SpectraCodex Drops.
          We review every submission and include tools that are live, useful, and
          genuinely shipped.
        </p>
      </div>

      {/* Launch Kit Requirements */}
      <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-white mb-2">Launch kit requirements</h2>
        <p className="text-xs text-[#666666] mb-6">
          ALL of the following are required. Incomplete submissions are closed without review.
        </p>
        <div className="flex flex-col gap-5">
          {requirements.map((req, i) => (
            <div key={i} className="flex gap-4">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#7c3aed]/20 text-[#7c3aed] text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-white">{req.title}</p>
                <p className="text-xs text-[#666666] mt-0.5">{req.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href={issueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Submit Your Tool →
        </a>
        <p className="text-xs text-[#444444] mt-4 max-w-sm mx-auto">
          Submissions are reviewed weekly. Approved tools are featured in the next
          SpectraCodex Drop.
        </p>
        <p className="text-xs text-[#333333] mt-2">
          Requires a GitHub account.
        </p>
      </div>

      <div className="mt-12 border-t border-[#222222] pt-8 text-center">
        <p className="text-sm text-[#666666]">
          Not sure if your tool qualifies?{" "}
          <Link href="/about/" className="text-[#7c3aed] hover:underline">
            Read about what we look for
          </Link>
        </p>
      </div>
    </div>
  );
}
