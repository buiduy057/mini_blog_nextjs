"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async (data: { name: string; price: string }) => {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create product");
      return res.json();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["product", id],
      }),
  });
  const { data, isPending } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetch(`/api/products/${id}`).then((res) => res.json()),
  });

  useEffect(() => {
    if (data?.product) {
      setName(data.product.name);
      setPrice(data.product.price);
    }
  }, [data]);
  if (isPending) return <p>Loading...</p>;
  const product: any = data?.product;

  const handleUpdate = () => {
    updateMutation.mutate({ name, price });
  };

  const handleAddCart = () => {};

  return (
    <div style={{ padding: 20 }}>
      <h1>Product Detail</h1>

      <p>
        <b>ID:</b> {product.id}
      </p>
      <p>
        <b>Name:</b> {product.name}
      </p>
      <p>
        <b>Price:</b> {product.price}
      </p>

      <Button onClick={handleAddCart}>Add Cart</Button>

      <hr />

      <h2>Update Product</h2>
      <input
        type="text"
        placeholder="New name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="New price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
};

export default page;
