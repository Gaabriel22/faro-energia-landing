import type { NextConfig } from "next"

import { securityHeaders } from "./src/lib/security-headers"

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders],
      },
    ]
  },
}

export default nextConfig
