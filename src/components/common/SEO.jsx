import { useEffect } from 'react'

const DOMAIN = 'https://rohitshrestha62.com.np'
const DEFAULT_IMAGE = `${DOMAIN}/profile.png`

function updateMetaTag(attributeName, attributeValue, content) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attributeName, attributeValue)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function updateLinkTag(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function updateSchemaScript(id, schemaData) {
  let script = document.getElementById(id)
  if (!schemaData) {
    if (script) script.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    script.setAttribute('id', id)
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(schemaData)
}

export default function SEO({
  title = 'Rohit Shrestha | Full Stack Developer & Frontend Specialist',
  description = 'Portfolio of Rohit Shrestha – Full Stack Developer and Frontend Specialist from Nepal specializing in React, TypeScript, Node.js, and modern web applications.',
  keywords = 'Rohit Shrestha, Full Stack Developer, Frontend Developer Nepal, React Developer, TypeScript, Node.js, Web Development, Portfolio',
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,
}) {
  const url = `${DOMAIN}${path.startsWith('/') ? path : `/${path}`}`

  useEffect(() => {
    // 1. Page Title
    document.title = title

    // 2. Standard Meta Tags
    updateMetaTag('name', 'description', description)
    updateMetaTag('name', 'keywords', keywords)
    updateMetaTag('name', 'author', 'Rohit Shrestha')
    updateMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

    // 3. Canonical URL
    updateLinkTag('canonical', url)

    // 4. OpenGraph Tags
    updateMetaTag('property', 'og:title', title)
    updateMetaTag('property', 'og:description', description)
    updateMetaTag('property', 'og:url', url)
    updateMetaTag('property', 'og:type', type)
    updateMetaTag('property', 'og:site_name', 'Rohit Shrestha Portfolio')
    updateMetaTag('property', 'og:image', image)
    updateMetaTag('property', 'og:image:alt', title)
    updateMetaTag('property', 'og:locale', 'en_US')

    // 5. Twitter Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    updateMetaTag('name', 'twitter:title', title)
    updateMetaTag('name', 'twitter:description', description)
    updateMetaTag('name', 'twitter:image', image)
    updateMetaTag('name', 'twitter:image:alt', title)

    // 6. Dynamic JSON-LD schema
    if (schema) {
      updateSchemaScript('dynamic-page-schema', schema)
    }

    return () => {
      // Clean up dynamic schema when unmounting page
      const dynamicScript = document.getElementById('dynamic-page-schema')
      if (dynamicScript) dynamicScript.remove()
    }
  }, [title, description, keywords, url, image, type, schema])

  return null
}
