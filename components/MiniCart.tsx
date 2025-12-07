"use client";
import { useCartStore } from "@/stores/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
interface Cart {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const MiniCart = () => {
  const queryClient = useQueryClient();
  const { cart, setCart, increase, decrease, removeItem, totalPrice } =
    useCartStore();
  console.log("data", cart);

  const { data } = useQuery({
    queryKey: ["carts"],
    queryFn: () => fetch(`/api/cart`).then((res) => res.json()),
  });
  // const deleteCartMutation = useMutation({
  //   mutationFn: (id: string) =>
  //     fetch(`/api/cart?id=${id}`, {
  //       method: "DELETE",
  //     }),
  //   onSuccess: () =>
  //     queryClient.invalidateQueries({
  //       queryKey: ["carts"],
  //     }),
  // });

  const handleRemoveItem = (id: string) => {
    // deleteCartMutation.mutate(id);
    removeItem(id);
  };

  const saveCartMutation = useMutation({
    mutationFn: (cart: Cart[]) =>
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      }),
  });
  const handleSaveCart = () => {
    saveCartMutation.mutate(cart);
  };
  useEffect(() => {
    if (data) {
      console.log("data", data);
      const dataNew = data.length
        ? Array.isArray(data[0].items)
          ? data[0].items
          : [data[0].items]
        : [];
      setCart(dataNew);
    }
  }, [data]);
  return (
    <div className="mt-5 mb-5">
      <h3>Mini Cart</h3>

      {cart.length === 0 && <p>Cart trống</p>}

      {cart.map((item: Cart) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <div>
            <b>{item.name}</b>
            <div>{item.price.toLocaleString()} đ</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => decrease(item.id)}>-</button>
              {item.qty}
              <button onClick={() => increase(item.id)}>+</button>
            </div>
          </div>

          <button onClick={() => handleRemoveItem(item.id)}>X</button>
        </div>
      ))}

      <hr />

      <div>
        <b>Tổng: </b>
        {totalPrice().toLocaleString()} đ
      </div>

      <Button
        variant="secondary"
        className="mt-5"
        onClick={() => handleSaveCart()}
      >
        Save Cart
      </Button>
    </div>
  );
};

export default MiniCart;
