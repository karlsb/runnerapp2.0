"use client"

/**
 *  This is a wrapper around Map to allow it to 
 *  dynamically rendered.
 *
 */

import dynamic from "next/dynamic";

export const LazyMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
