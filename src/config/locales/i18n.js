import React from 'react'
import ReactMarkdown from 'react-markdown'
import en from './en'

const locales = { en }

class I18n {
  localeId (id, locale = 'en') {
    return `${locale}.${id}`
  }

  valid (text) {
    return !!text && text.length > 0
  }

  value (id, locale = 'en') {
    try {
      return id.split('.').reduce((o, i) => o[i], locales[locale]) || ''
    } catch (e) {
      return ''
    }
  }

  valueType (value) {
    return Object.prototype.toString.call(value)
  }

  isArray (value) {
    return this.valueType(value) === '[object Array]'
  }

  t (id, locale = 'en') {
    const text = this.value(id, locale)
    if (!this.valid(text)) {
      return this.localeId(id, locale)
    }

    if (this.isArray(text)) {
      return text.join('\n')
    }

    return text
  }

  m (id, locale = 'en') {
    const text = this.value(id, locale)
    const localeId = this.localeId(id, locale)
    if (!this.valid(text)) {
      return localeId
    }

    if (this.isArray(text)) {
      return text.map((txt, i) => {
        return markdown(txt, `${localeId}-${i}`)
      })
    }

    return markdown(text)
  }
}

export const i18n = new I18n()

export const markdown = (text, key) => {
  return (<ReactMarkdown source={text} key={key} />)
}
