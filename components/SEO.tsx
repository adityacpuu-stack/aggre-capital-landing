"use client"

import { useEffect } from 'react'

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
  const seoData = seo || {
    title,
    description,
    canonical,
    openGraph,
    twitter,
    additionalMetaTags
  }

  useEffect(() => {
    if (seoData.title) {
      document.title = seoData.title
    }

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    if (seoData.description) {
      setMeta('name', 'description', seoData.description)
    }

    if (seoData.canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', seoData.canonical)
    }

    if (seoData.openGraph) {
      const og = seoData.openGraph
      if (og.title || seoData.title) setMeta('property', 'og:title', og.title || seoData.title || '')
      if (og.description || seoData.description) setMeta('property', 'og:description', og.description || seoData.description || '')
      setMeta('property', 'og:type', og.type || 'website')
      if (og.url) setMeta('property', 'og:url', og.url)
      if (og.images?.[0]) setMeta('property', 'og:image', og.images[0].url)
    }

    if (seoData.twitter) {
      if (seoData.twitter.handle) setMeta('name', 'twitter:site', seoData.twitter.handle)
      if (seoData.twitter.cardType) setMeta('name', 'twitter:card', seoData.twitter.cardType)
    }

    if (seoData.additionalMetaTags) {
      seoData.additionalMetaTags.forEach(tag => {
        if (tag.name) setMeta('name', tag.name, tag.content)
        else if (tag.property) setMeta('property', tag.property, tag.content)
      })
    }
  }, [seoData])

  return null
}
