import React, { useEffect, useState } from 'react';

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetch('/api/watchlist')
      .then((response) => response.json())
      .then((data) => setWatchlist(data));
  }, []);

  return (
    <div>
      <h1>My Watchlist</h1>
      <ul>
        {watchlist.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;