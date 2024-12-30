import Image from "next/image";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Link from "next/link";

async function getData(category: string) {
  const query = `*[_type == 'product' && category -> name == '${category}' ]{
  id,
    name,
    price,
    "imageUrl": images[0].asset->url,
      "slug": slug.current,
      "categoryName": category->name
}`;

  const data = await client.fetch(query);

  return data;
}

export default async function page({
  params,
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(params.category);
  return (
    <div className=" bg-white">
      <div className=" mx-auto max-w-2xl px-4  sm:px-6 lg:max-w-7xl lg:px-8">
        <div className=" flex justify-between items-center">
          <h2 className=" text-gray-900 text-2xl font-bold tracking-tight">
            Our Products for {params.category}
          </h2>
        </div>
        <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div className="group relative" key={product._id}>
              <div className=" aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt="Product Image"
                  className=" w-full h-full object-cover object-center lg:w-full lg:h-full"
                  width={300}
                  height={300}
                />
              </div>
              <div className=" mt-4 flex justify-between">
                <div className=" text-sm text-gray-700">
                  <Link href={`/product/${product.slug}`}>
                    <h3>{product.name}</h3>
                  </Link>
                  <p className=" font-bold mt-1 text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <p className=" text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
