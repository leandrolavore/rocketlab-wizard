'use client';

import { createContext, useContext, useState } from "react";

export type FreightItem = {
  id: number;
  name: string;
  length: number;
  height: number;
  depth: number;
}

const ItemsCartContext = createContext<ReturnType<typeof useItemsCartCore> | null>(null);

const useItemsCartCore = () => {
  const [selectedItems, setSelectedItems] = useState<FreightItem[]>([]);

  const VOLUMETRIC_DIVISOR = 6000;

  function calculateVolume({
    length,
    height,
    depth
  }: { length: number; height: number; depth: number }) {
    const volume = length * height * depth;
    return parseFloat(volume.toFixed(2)); // volume in cm3
  }

  // Source: https://www.parcelhero.com/en-gb/support/volumetric-weight-calculator
  function calculateVolumetricWeight({
    length,
    height,
    depth
  }: { length: number; height: number; depth: number }) {
    const volume = calculateVolume({ length, height, depth });
    const volumetricWeight = volume / VOLUMETRIC_DIVISOR;
    return parseFloat(volumetricWeight.toFixed(2)); // Volumetric weight in kg
  }

  const stock: FreightItem[] = [
    { id: 1, name: 'Item 1', length: 120, height: 100, depth: 30 },
    { id: 2, name: 'Item 2', length: 80, height: 60, depth: 40 },
    { id: 3, name: 'Item 3', length: 200, height: 50, depth: 50 },
    { id: 4, name: 'Item 4', length: 150, height: 90, depth: 60 },
  ];

  function isItemInOrder(item: FreightItem) {
    return selectedItems.some(selected => selected.id === item.id);
  }

  function addItemToOrder(item: FreightItem) {
    setSelectedItems((prev) => {
      if (isItemInOrder(item)) {
        return prev;
      }
      return [...prev, item];
    });
  }

  function removeItemFromOrder(item: FreightItem) {
    setSelectedItems((prev) => prev.filter(i => i.id !== item.id));
  }

  function calculateTotalVolume() {
    return selectedItems.reduce((sum, item) => sum + calculateVolume(item), 0).toFixed(2);
  }

  function calculateTotalVolumetricWeight() {
    return selectedItems.reduce((sum, item) => sum + calculateVolumetricWeight(item), 0).toFixed(2);
  }


  return {
    stock,
    calculateVolume,
    calculateVolumetricWeight,
    selectedItems,
    addItemToOrder,
    removeItemFromOrder,
    isItemInOrder,
    calculateTotalVolume,
    calculateTotalVolumetricWeight
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