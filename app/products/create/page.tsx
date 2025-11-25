"use client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FullScreenLoader from "@/components/FullScreenLoader";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.preprocess((val) => {
    if (typeof val === "string") return Number(val);
    return val;
  }, z.number().min(0, "Price must be >= 0")),
});

const CreateForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });
  const router = useRouter();

  const { mutate, status } = useMutation({
    mutationFn: async (data: { name: string; price: number }) => {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create product");
      return res.json();
    },
    onSuccess: () => {
      router.push("/products");
    },
  });
  const isLoading = status === "pending";

  const onSubmit = (values: any) => {
    mutate(values);
  };

  return (
    <div className="relative">
      <FullScreenLoader isLoading={isLoading} text="Submitting product..." />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-sm"
        >
          {/* NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PRICE */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    value={field.value as number}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateForm;
