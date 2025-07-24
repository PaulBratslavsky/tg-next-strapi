import Link from "next/link"
import { Item } from "@/types"
import { StrapiImage } from "../custom/strapi-image"

interface ProductsListProps {
  items: Item[]
}

export async function ProductsList({ items = [] }: ProductsListProps) {
  return (
    <div className="my-14 container mx-auto">
      <div className="w-full">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">Ignite Your Imagination</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
          {items &&
            items.map((item) => (
              <Link
                href={`/products/${item.documentId}`}
                key={item.documentId}
                className="cursor-pointer flex flex-col text-start group hover:scale-105 transition-transform duration-200"
              >
                <div className="relative overflow-hidden rounded-xl mb-5 sm:mb-6">
                  <StrapiImage
                    className="w-full aspect-[4/5] bg-muted object-cover group-hover:scale-110 transition-transform duration-300"
                    src={item.image.url || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={400}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <p className="max-w-[25ch] text-muted-foreground text-[17px]">{item.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-semibold text-primary">
                      ${item.price}
                    </span>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.size}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {item.category && (
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {item.category.name}
                      </span>
                    )}
                    {item.featured && (
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}


