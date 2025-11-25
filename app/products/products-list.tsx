"use client";
import { useQuery } from "@tanstack/react-query";

const ProductsList = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then((res) => res.json()),
  });

  return (
    <div className="space-y-2">
      {data?.map((p: any) => (
        <div key={p.id} className="p-3 border rounded">
          {p.name} - ${p.price}
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
