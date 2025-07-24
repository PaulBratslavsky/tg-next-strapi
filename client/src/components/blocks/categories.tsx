import { getAllCategories } from "@/data/loaders"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { cn } from "@/lib/utils"


async function CategoriesContent() {
  const { data: categories } = await getAllCategories()
  console.log(categories)

  return (
    <div className="my-24 container mx-auto">
      <div className="w-full">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">Ignite Your Imagination</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
          {categories &&
            categories.map((category) => (
              <Link
                href={`/products?category=${category.url}`}
                key={category.documentId}
                className="cursor-pointer flex flex-col text-start group hover:scale-105 transition-transform duration-200"
              >
                <div className="relative overflow-hidden rounded-xl mb-5 sm:mb-6">
                  <Image
                    className="w-full aspect-[4/5] bg-muted object-cover group-hover:scale-110 transition-transform duration-300"
                    src={category.image.url || "/placeholder.svg"}
                    alt={category.name}
                    width={300}
                    height={400}
                  />
                </div>
                <span className="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                  {category.name}
                </span>
                <p className="mt-2 max-w-[25ch] text-muted-foreground text-[17px]">{category.description}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export function Categories() {
  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <CategoriesContent />
    </Suspense>
  )
}


function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

export { Skeleton }


export function CategoriesSkeleton() {
  return (
    <div className="my-24 container mx-auto">
      <div className="w-full">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">Ignite Your Imagination</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col text-start">
              {/* Image skeleton */}
              <Skeleton className="mb-5 sm:mb-6 w-full aspect-[4/5] rounded-xl" />

              {/* Title skeleton */}
              <Skeleton className="h-8 w-3/4 mb-2" />

              {/* Description skeleton - multiple lines */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
