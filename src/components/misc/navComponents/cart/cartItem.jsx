import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';

const CartItem = ({ 
  imageSrc, 
  name, 
  price, 
  size, 
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onDelete
}) => {
  return (
    <div className="grid grid-cols-2">
      <div className="">
        <Image
          src={imageSrc}
          alt={`${name} product image`}
          height={125}
          width={125}
        //   fill={true}
        />
      </div>
      <div className="space-y-1">
        <h1 className="font-medium">{name}</h1>
        <p className="font-light text-slate-600">{price}</p>
        <p className="font-light text-slate-400">{size}</p>
        <div className="flex justify-start space-x-1">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={onDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={onIncreaseQuantity}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onDelete}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;