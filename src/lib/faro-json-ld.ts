import { faroBrand, faroLandingContent } from "@/content"
import { siteUrl } from "@/lib/site-url"

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).href
}

function createFaroJsonLd() {
  const pageUrl = absoluteUrl("/")
  const organizationId = `${pageUrl}#organization`
  const websiteId = `${pageUrl}#website`
  const serviceId = `${pageUrl}#solar-service`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: pageUrl,
        name: faroBrand.name,
        alternateName: faroBrand.shortName,
        inLanguage: "pt-BR",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: faroBrand.name,
        url: pageUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon.svg"),
        },
        email: faroLandingContent.footer.email,
        description: faroLandingContent.footer.description,
        areaServed: faroBrand.serviceArea,
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: "Projeto e instalação de energia solar para pequenos negócios",
        serviceType: "Energia solar para pequenos negócios",
        url: pageUrl,
        description: faroLandingContent.hero.description,
        provider: { "@id": organizationId },
        areaServed: faroBrand.serviceArea,
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Pequenos negócios",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: `${pageUrl}#duvidas`,
        inLanguage: "pt-BR",
        mainEntity: faroLandingContent.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  }
}

export { createFaroJsonLd }
