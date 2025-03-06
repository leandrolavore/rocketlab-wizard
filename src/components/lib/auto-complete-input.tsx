'use client';
import React, { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { useDebouncedCallback } from 'use-debounce';

type Suggestion = {
  placeId: string;
  displayName: string;
  secondaryText: string;
};

const AutoCompleteInput = ({ onSelectAddress }: {
  onSelectAddress: (address: Record<string, string>) => void;
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Tab') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        await handleSelect(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const handleSelect = async (place: Suggestion) => {
    setSuggestions([]);
    inputRef.current!.value = `${place.displayName}, ${place.secondaryText}`;  // Set input value directly
    const fullDetails = await fetch(`/api/places/${place.placeId}`).then(res => res.json());
    onSelectAddress(fullDetails);
  };

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Search address..."
      />
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border mt-1 z-50">
          {suggestions.map((
            place: { placeId: string; displayName: string; secondaryText: string; },
            idx: number
          ) => (
            <div
              key={place.placeId}
              className={`p-2 cursor-pointer ${highlightedIndex === idx ? 'bg-gray-200' : ''}`}
              onClick={() => handleSelect(place)}
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
