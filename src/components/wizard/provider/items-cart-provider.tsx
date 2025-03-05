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
    return selectedItems.reduce((sum, item) => sum + calculateVolume(item), 0);
  }

  function calculateTotalVolumetricWeight() {
    return selectedItems.reduce((sum, item) => sum + calculateVolumetricWeight(item), 0);
  }

  function formatNumber(value: number) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  function getFormattedTotalVolume() {
    return formatNumber(calculateTotalVolume());
  }

  function getFormattedTotalVolumetricWeight() {
    return formatNumber(calculateTotalVolumetricWeight());
  }

  function getFormattedVolume(item: FreightItem) {
    return formatNumber(calculateVolume(item));
  }

  function getFormattedVolumetricWeight(item: FreightItem) {
    return formatNumber(calculateVolumetricWeight(item));
  }

  return {
    stock,
    selectedItems,
    addItemToOrder,
    removeItemFromOrder,
    isItemInOrder,
    getFormattedTotalVolume,
    getFormattedTotalVolumetricWeight,
    getFormattedVolume,
    getFormattedVolumetricWeight
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