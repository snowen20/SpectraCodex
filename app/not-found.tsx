import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-bold text-[#7c3aed] mb-4">404</p>
      <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-[#666666] mb-8">
        This tool has escaped the directory. Try browsing the full collection.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Home
        </Link>
        <Link
          href="/browse/"
          className="bg-[#111111] border border-[#222222] hover:border-[#7c3aed] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Browse all tools
        </Link>
      </div>
    </div>
  );
}
