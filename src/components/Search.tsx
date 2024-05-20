import React, { useState } from 'react';
import Fuse from 'fuse.js';

interface SearchProps {
  data: any[];
}

export const Search: React.FC<SearchProps> = ({ data }) => {
  const [query, setQuery] = useState('');

  const fuse = new Fuse(data, {
    keys: ['title', 'content'], // replace with your own data keys
  });

  const results = fuse.search(query);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {results.map((result, index) => (
        <div key={index}>
          <h2>{result.item.title}</h2> {/* replace with your own data structure */}
          <p>{result.item.content}</p> {/* replace with your own data structure */}
        </div>
      ))}
    </div>
  );
};
