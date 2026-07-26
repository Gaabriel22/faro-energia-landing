const LOCAL_SITE_URL = "http://localhost:3000"

function resolveSiteUrl(value = process.env.SITE_URL): URL {
  if (!value?.trim()) {
    return new URL(LOCAL_SITE_URL)
  }

  try {
    const url = new URL(value)

    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    ) {
      return new URL(LOCAL_SITE_URL)
    }

    url.pathname = "/"
    url.search = ""
    url.hash = ""

    return url
  } catch {
    return new URL(LOCAL_SITE_URL)
  }
}

const siteUrl = resolveSiteUrl()

export { LOCAL_SITE_URL, resolveSiteUrl, siteUrl }
