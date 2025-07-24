
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function CategoryButton({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const currentCategory = searchParams.get("category");
  console.log(currentCategory);
  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value.toLowerCase());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <button
      type="button"
      onClick={() => handleSelect(value)}
      className={
        "rounded-full outline-1 px-3 py-0.5 text-sm " +
        (currentCategory === value.toLowerCase()
          ? "bg-primary text-white"
          : "outline-primary text-primary")
      }
    >
      {children}
    </button>
  );
}
