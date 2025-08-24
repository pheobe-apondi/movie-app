import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.tmdb.org'], // add TMDB domain here
  },
};

module.exports = nextConfig;


export default nextConfig;
