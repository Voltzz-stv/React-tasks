/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {

    remotePatterns: [
      {
        protocol: "https",
        // hostname: "i.guim.co.uk",
        hostname: "*",
        port: "",
        // pathname:
        //   "/img/static/sys-images/Guardian/Pix/pictures/2015/3/5/1425578092907/**",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
