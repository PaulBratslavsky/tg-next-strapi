import Image from "next/image"
import { Item } from "@/types"

interface ProductViewProps {
  item: Item
}

export function ProductView({ item }: ProductViewProps) {
  return (
    <div className="my-24 container mx-auto px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                className="w-full aspect-square bg-muted object-cover"
                src={item.image.url || "/placeholder.svg"}
                alt={item.name}
                width={600}
                height={600}
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {item.category && (
                  <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    {item.category.name}
                  </span>
                )}
                {item.featured && (
                  <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                {item.name}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Price and Size */}
            <div className="flex items-center justify-between py-6 border-t border-b border-border">
              <div className="space-y-1">
                <span className="text-3xl font-bold text-primary">
                  ${item.price}
                </span>
                <p className="text-sm text-muted-foreground">Free shipping</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground">Size</span>
                <div className="text-lg font-semibold">{item.size}</div>
              </div>
            </div>

            {/* Long Description */}
            {item.longDescription && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Description</h3>
                <div className="prose prose-gray max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: item.longDescription }} />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 border border-border px-8 py-4 rounded-lg font-semibold hover:bg-muted transition-colors">
                Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
              <div>
                <h4 className="font-semibold mb-2">Availability</h4>
                <p className="text-sm text-muted-foreground">In Stock</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">SKU</h4>
                <p className="text-sm text-muted-foreground">{item.documentId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


