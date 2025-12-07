"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Demo from "@/assets/images/demo.jpg";
interface Cart {
  id: string;
  name: string;
  price: number;
  qty: number;
}
import { useCartStore } from "@/stores/cart";
const ProductsList = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then((res) => res.json()),
  });

  const { addItem } = useCartStore();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/products/?id=${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["products"],
      }),
  });
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleAddCart = (cart: Cart) => {
    const cartAddQty = { ...cart, qty: 1 };
    // addCartMutation.mutate(cartAddQty);
    addItem(cartAddQty);
  };

  const images = Array.from({ length: 12 }).map(
    (_, i) => `https://picsum.photos/${i}/200/300`
  );

  return (
    <div className="space-y-2">
      {data?.map((p: any) => (
        <div key={p.id} className="p-3 border rounded">
          <Link href={`/products/${p.id}`}>
            {p.name} - ${p.price}
          </Link>
          <Button
            variant="secondary"
            className="ml-5"
            onClick={() => handleAddCart(p)}
          >
            Add Cart
          </Button>
          <Button
            variant="destructive"
            className="ml-5"
            onClick={() => handleDelete(p.id)}
          >
            Delete
          </Button>
        </div>
      ))}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 12 }).map((src, index) => (
          <div key={index} className="relative w-full h-40 md:h-48">
            <Image
              src={Demo}
              alt="Gallery Image"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
