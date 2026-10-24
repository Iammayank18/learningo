import { getLang, t } from './i18n'

function meta(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector)
  if (el) el.content = content
}

/** Keep the document title, description and social tags in sync with the UI language. */
export function applySeo() {
  const lang = getLang()
  const locale = lang === 'en' ? 'en_IN' : 'hi_IN'

  document.title = t('seo.title')
  document.documentElement.lang = lang === 'en' ? 'en' : 'hi-Latn'

  meta('meta[name="description"]', t('seo.description'))
  meta('meta[property="og:locale"]', locale)
  meta('meta[property="og:title"]', t('seo.ogTitle'))
  meta('meta[property="og:description"]', t('seo.ogDescription'))
  meta('meta[property="og:image:alt"]', t('seo.ogImageAlt'))
  meta('meta[name="twitter:title"]', t('seo.twitterTitle'))
  meta('meta[name="twitter:description"]', t('seo.twitterDescription'))
  meta('meta[name="twitter:image:alt"]', t('seo.ogImageAlt'))
}
