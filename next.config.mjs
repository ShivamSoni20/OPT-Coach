/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/optcoachslides",
        destination: "/opt-coach-pitch-deck.html"
      }
    ];
  }
};

export default nextConfig;
