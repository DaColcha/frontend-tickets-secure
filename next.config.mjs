/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },

  // async redirects () {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/maintenance',
  //       permanent: false,
  //     },
  //     {
  //       source: '/login',
  //       destination: '/maintenance',
  //       permanent: false,
  //     },
  //     {
  //       source: '/panel',
  //       destination: '/maintenance',
  //       permanent: false,
  //     },
  //     {
  //       source: '/panel/reporte',
  //       destination: '/maintenance',
  //       permanent: false,
  //     },
  //     {
  //       source: '/localidades',
  //       destination: '/maintenance',
  //       permanent: false,
  //     },
  //     {
  //       source: '/localidades/general',
  //       destination: '/maintenance',
  //       permanent: false,
  //     },
  //   ]
  // }


};

export default nextConfig;
