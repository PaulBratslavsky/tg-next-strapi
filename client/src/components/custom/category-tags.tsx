import { getAllCategories } from "@/data/loaders"
import { CategoryButton } from "@/components/custom/category-button";


export async function CategorySelect() {
  const data = await getAllCategories();
  const categories = data?.data;
  if (!categories) return null;

  return (
    <div className="w-full flex gap-2 justify-center items-center mt-10">
      {categories.map((category) => (
        <CategoryButton key={category.documentId} value={category.url}>
          {category.name}
        </CategoryButton>
      ))}
      <CategoryButton value="">all</CategoryButton>
    </div>
  );
}