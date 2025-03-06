'use client';

import { createContext, useContext, useState } from "react";
export const PRICE_CENTS_PER_KG = 400;

export type FreightItem = {
  id: number;
  name: string;
  length: number;
  height: number;
  depth: number;
}

const ItemsCartContext = createContext<ReturnType<typeof useItemsCartCore> | null>(null);
const emptyOrder: {
  items: FreightItem[];
  totalVolume: number;
  totalVolumetricWeight: number;
  priceTotal: number;
} = {
  items: [],
  totalVolume: 0,
  totalVolumetricWeight: 0,
  priceTotal: 0,
}

const useItemsCartCore = () => {
  const [order, setOrder] = useState(emptyOrder);

  const VOLUMETRIC_DIVISOR = 6000;

  const stock: FreightItem[] = [
    { id: 1, name: 'Item 1', length: 120, height: 100, depth: 30 },
    { id: 2, name: 'Item 2', length: 80, height: 60, depth: 40 },
    { id: 3, name: 'Item 3', length: 200, height: 50, depth: 50 },
    { id: 4, name: 'Item 4', length: 150, height: 90, depth: 60 },
  ];

  function calculateVolume({ length, height, depth }: {
    length: number;
    height: number;
    depth: number;
  }) {
    return length * height * depth;
  }

  // Source: https://www.parcelhero.com/en-gb/support/volumetric-weight-calculator
  function calculateVolumetricWeight({ length, height, depth }: {
    length: number;
    height: number;
    depth: number;
  }) {
    return calculateVolume({ length, height, depth }) / VOLUMETRIC_DIVISOR;
  }

  function isItemInOrder(item: FreightItem) {
    return order.items.some(selected => selected.id === item.id);
  }

  function calculateOrderTotals(items: FreightItem[]) {
    const totalVolume = items.reduce((sum, item) => sum + calculateVolume(item), 0);
    const totalVolumetricWeight = items.reduce((sum, item) => sum + calculateVolumetricWeight(item), 0);
    const priceTotal = (totalVolumetricWeight * PRICE_CENTS_PER_KG) / 100;

    return { totalVolume, totalVolumetricWeight, priceTotal };
  }

  function addItemToOrder(item: FreightItem) {
    setOrder(prev => {
      const updatedItems = isItemInOrder(item) ? prev.items : [...prev.items, item];
      const { totalVolume, totalVolumetricWeight, priceTotal } = calculateOrderTotals(updatedItems);

      return {
        ...prev,
        items: updatedItems,
        totalVolume,
        totalVolumetricWeight,
        priceTotal
      };
    });
  }

  function removeItemFromOrder(item: FreightItem) {
    setOrder(prev => {
      const updatedItems = prev.items.filter(i => i.id !== item.id);
      const { totalVolume, totalVolumetricWeight, priceTotal } = calculateOrderTotals(updatedItems);

      return {
        ...prev,
        items: updatedItems,
        totalVolume,
        totalVolumetricWeight,
        priceTotal
      };
    });
  }

  function formatNumber(value: number) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  function getFormattedTotalVolume() {
    return formatNumber(order.totalVolume);
  }

  function getFormattedTotalVolumetricWeight() {
    return formatNumber(order.totalVolumetricWeight);
  }

  function getFormattedVolume(item: FreightItem) {
    return formatNumber(calculateVolume(item));
  }

  function getFormattedVolumetricWeight(item: FreightItem) {
    return formatNumber(calculateVolumetricWeight(item));
  }

  function getFormattedPriceTotal() {
    return formatNumber(order.priceTotal);
  }

  function clearCart() {
    setOrder(emptyOrder);
  }

  return {
    stock,
    order,
    addItemToOrder,
    removeItemFromOrder,
    isItemInOrder,
    getFormattedTotalVolume,
    getFormattedTotalVolumetricWeight,
    getFormattedVolume,
    getFormattedVolumetricWeight,
    getFormattedPriceTotal,
    clearCart,
    calculateVolumetricWeight
  };
};

export const ItemsCartProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useItemsCartCore();

  return (
    <ItemsCartContext.Provider value={value}>
      {children}
    </ItemsCartContext.Provider>
  );
};

export const useItemsCart = () => {
  const context = useContext(ItemsCartContext);
  if (!context) {
    throw new Error("useItemsCart must be used within ItemsCartProvider");
  }
  return context;
};