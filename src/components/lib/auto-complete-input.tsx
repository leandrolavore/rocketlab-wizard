'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { useDebouncedCallback } from 'use-debounce';

const AutoCompleteInput = ({ onSelectAddress }: {
  onSelectAddress: (address: Record<string, string>) => void;
}) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(`/api/places?input=${encodeURIComponent(input)}`);
    const data = await response.json();
    setSuggestions(data || []);
  };

  const debouncedFetchSuggestions = useDebouncedCallback(fetchSuggestions, 300);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFetchSuggestions(e.target.value);
  };

  return (
    <div className="relative">
      <Input
        onChange={handleInput}
        placeholder="Search address..."
      />
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border mt-1 z-50">
          {suggestions.map((
            place: { placeId: string; displayName: string; secondaryText: string; }
          ) => (
            <div
              key={place.placeId}
              className="p-2 hover:bg-gray-100 cursor-pointer overflow-y-auto max-h-96"
              onClick={async () => {
                setSuggestions([]);
                const fullDetails = await fetch(`/api/places/${place.placeId}`).then(res => res.json());
                onSelectAddress(fullDetails);
              }}
            >
              {`${place.displayName}, ${place.secondaryText}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInput;
