/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sulbeccgotetgnyrftir.supabase.co",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
