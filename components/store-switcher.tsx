"use client";
import { useStoreModal } from "@/hooks/use-store.modal";
import { Store } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Check, ChevronsDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CommandInput, Command, CommandList, CommandEmpty, CommandGroup,CommandItem, CommandSeparator } from "./ui/command";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger> //уточнить о <>
interface StoreSwitcherProps extends PopoverTriggerProps {//уточнить extend
    items: Store[];
};
export default function StoreSwitcher({
className,
items = []
}: StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((items) => ({
        label: items.name,
        value: items.id

    })) ;

    const currentStore = formattedItems.find((items) => items.value === params.storeId);
   
    const [open, setOpen] = useState(false);
    
    const onStoreSelect = (store : {value : string, label: string}) => {
        setOpen(false);
        router.push(`/${store.value}`);
    }
    
return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button 
             variant="outline"
             size="sm"
             role="combobox"
             aria-expanded={open}
             aria-label="Select a store"
             className={cn(" w-[200px] justify-between", className)}
             >
              <StoreIcon />
              {currentStore?.label}
              <ChevronsDown className="mi-auto h-4 w-4 shrink-0 opacity-50"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandList>
                    <CommandInput placeholder="Search store..." />
                 <CommandEmpty>  No Store found.  </CommandEmpty>
                    <CommandGroup heading="Stores">
                        {formattedItems.map((store) => (
                            <CommandItem
                            key={store.value}
                            onSelect={() => onStoreSelect(store)}
                            className="text-sm"
                            >
                             <StoreIcon className="mr-2 h-4 w-4"/>
                             {store.label}
                              <Check
                               className={cn("mr-2 h-4 w-4",
                                currentStore?.value === store.value
                                ? "opacity-100"
                                : "opacity-0"
                               )}
                               />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
                <CommandSeparator/>
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                            onSelect={() => {
                                setOpen(false)
                                storeModal.onOpen()
                            }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5"/>
                                Create Store
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>

  )
}

