import React, { useEffect, useState } from 'react';

export default function DataFetchingWithUseEffect() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000');
      const data = await response.json();
      setUser(data.results[0]);
    };

    fetchData();
  }, []);

  // if (!user) return <div>Loading...</div>;

  return <div></div>;
}
