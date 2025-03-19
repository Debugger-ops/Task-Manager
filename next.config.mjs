/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      MONGODB_URI: process.env.MONGODB_URI,
    },
  };
  
  console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);
  
  export default nextConfig;

  