'use client';

import React from 'react';
import { usePlacesWidget } from "react-google-autocomplete";
import { Input } from '../ui/input';

const AutoCompleteInput = ({
  onSelectAddress
}: {
  onSelectAddress: (val: Record<string, string>) => void
}) => {
  const { ref } = usePlacesWidget({
    onPlaceSelected: (place) => {
      console.log(place);
      onSelectAddress(place);
    }
  });

  return <Input ref={ref} />;
}

export default AutoCompleteInput;
