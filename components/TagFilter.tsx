"use client";

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export default function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagChange(null)}
        className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
          activeTag === null
            ? "bg-[#7c3aed] border-[#7c3aed] text-white"
            : "bg-transparent border-[#222222] text-[#666666] hover:border-[#7c3aed] hover:text-white"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(activeTag === tag ? null : tag)}
          className={`text-sm px-3 py-1.5 rounded-full border transition-colors capitalize ${
            activeTag === tag
              ? "bg-[#7c3aed] border-[#7c3aed] text-white"
              : "bg-transparent border-[#222222] text-[#666666] hover:border-[#7c3aed] hover:text-white"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
