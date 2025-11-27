"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const ProductsList = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then((res) => res.json()),
  });

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

  return (
    <div className="space-y-2">
      {data?.map((p: any) => (
        <div key={p.id} className="p-3 border rounded">
          <Link href={`/products/${p.id}`}>
            {p.name} - ${p.price}
          </Link>
          <Button
            variant="destructive"
            className="ml-2"
            onClick={() => handleDelete(p.id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
