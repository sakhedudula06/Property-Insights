import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';


function Loading() {

  const [loading, setLoading] = useState(false);


  if (loading === false) {

    setLoading(true);
    const root = createRoot(document.getElementById('card'));
    root.render(<span className="loading loading-dots loading-lg"></span>);

    console.log('Succesful Loading State');

  } else {
    setLoading(false);
  }
}


export default Loading


