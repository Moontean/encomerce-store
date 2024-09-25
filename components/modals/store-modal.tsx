"use client";

import { useState } from "react";
import { useStoreModal } from "@/hooks/use-store.modal";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";


const formSchema = z.object({
  name: z.string().min(1, "Store name is required"),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      
      const response = await axios.post('/api/stores', values);
      
      window.location.assign(`/${response.data.id}`);
    }catch (error){
      toast.error("Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4"> {/* Flexbox контейнер с отступом */}
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <input disabled={loading}
                          {...field}
                          placeholder="Enter store name"
                          className="input"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 items-center justify-end">
                <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
               <Button type="submit" disabled={loading}>Continue </Button>
              </div>
            
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
