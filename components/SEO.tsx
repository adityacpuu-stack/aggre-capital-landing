"use client"

import Head from 'next/head'

interface SEOProps {
  seo?: {
    title?: string
    description?: string
    canonical?: string
    openGraph?: {
      title?: string
      description?: string
      url?: string
      type?: string
      images?: Array<{
        url: string
        width?: number
        height?: number
        alt?: string
      }>
    }
    twitter?: {
      handle?: string
      site?: string
      cardType?: string
    }
    additionalMetaTags?: Array<{
      name?: string
      property?: string
      content: string
    }>
  }
  title?: string
  description?: string
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    url?: string
    type?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
  }
  twitter?: {
    handle?: string
    site?: string
    cardType?: string
  }
  additionalMetaTags?: Array<{
    name?: string
    property?: string
    content: string
  }>
}

export default function SEO({ 
  seo,
  title, 
  description, 
  canonical, 
  openGraph, 
  twitter, 
  additionalMetaTags 
}: SEOProps) {
  // Use seo object if provided, otherwise use individual props
  const seoData = seo || {
    title,
    description,
    canonical,
    openGraph,
    twitter,
    additionalMetaTags
  }
  return (
    <Head>
      {seoData.title && <title>{seoData.title}</title>}
      {seoData.description && <meta name="description" content={seoData.description} />}
      {seoData.canonical && <link rel="canonical" href={seoData.canonical} />}
      
      {/* Open Graph */}
      {seoData.openGraph && (
        <>
          <meta property="og:title" content={seoData.openGraph.title || seoData.title} />
          <meta property="og:description" content={seoData.openGraph.description || seoData.description} />
          <meta property="og:type" content={seoData.openGraph.type || 'website'} />
          {seoData.openGraph.url && <meta property="og:url" content={seoData.openGraph.url} />}
          {seoData.openGraph.images && seoData.openGraph.images.map((image, index) => (
            <div key={index}>
              <meta property="og:image" content={image.url} />
              {image.width && <meta property="og:image:width" content={image.width.toString()} />}
              {image.height && <meta property="og:image:height" content={image.height.toString()} />}
              {image.alt && <meta property="og:image:alt" content={image.alt} />}
            </div>
          ))}
        </>
      )}
      
      {/* Twitter */}
      {seoData.twitter && (
        <>
          {seoData.twitter.handle && <meta name="twitter:site" content={seoData.twitter.handle} />}
          {seoData.twitter.cardType && <meta name="twitter:card" content={seoData.twitter.cardType} />}
        </>
      )}
      
      {/* Additional Meta Tags */}
      {seoData.additionalMetaTags && seoData.additionalMetaTags.map((tag, index) => (
        <meta 
          key={index}
          {...(tag.name ? { name: tag.name } : { property: tag.property })}
          content={tag.content}
        />
      ))}
    </Head>
  )
}
