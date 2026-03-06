import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#222222] bg-[#0a0a0a] mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm text-[#666666]">
            &copy; {new Date().getFullYear()} SpectraCodex. Built for
            vibecodeineers.
          </p>
          <p className="text-xs text-[#444444] mt-1">
            Curated tools for people who ship first and polish later.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-xs text-[#666666] hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/submit"
            className="text-xs text-[#666666] hover:text-white transition-colors"
          >
            Submit
          </Link>
          <a
            href="#top"
            className="text-xs text-[#666666] hover:text-[#7c3aed] transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
