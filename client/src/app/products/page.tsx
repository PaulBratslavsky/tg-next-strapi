import { Suspense } from "react"
import { getAllItems } from "@/data/loaders"
import { ProductsList } from "@/components/blocks/products"
import { cn } from "@/lib/utils"
import { Search } from "@/components/custom/search"
import { PaginationComponent } from "@/components/custom/pagination"

export default async function ProductsRoute() {
  const { data: items } = await getAllItems()
  console.log(items)
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <div className="my-14 container mx-auto">
        <Search />
        <ProductsList items={items || []} />
        <PaginationComponent pageCount={10} />
      </div>
    </Suspense>
  )
}

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}


export function ProductsSkeleton() {
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
