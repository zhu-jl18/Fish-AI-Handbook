/**
 * Client-side script to convert ISO timestamps to relative time format
 * (e.g., "3 hours ago", "2 days ago")
 *
 * This script finds all elements with a data-timestamp attribute and
 * updates their text content to show a human-readable relative time.
 */

/**
 * Calculate relative time from an ISO timestamp using Intl.RelativeTimeFormat
 * Falls back to English strings when Intl API is unavailable.
 * @param {string} isoTimestamp - ISO 8601 timestamp string
 * @returns {string}
 */
function getRelativeTime(isoTimestamp) {
  if (!isoTimestamp) return ''
  try {
    const now = new Date()
    const then = new Date(isoTimestamp)
    const diffSeconds = Math.round((then.getTime() - now.getTime()) / 1000)

    // Just now
    if (Math.abs(diffSeconds) < 60) return 'just now'

    // Use Intl.RelativeTimeFormat when available
    if (typeof Intl !== 'undefined' && Intl.RelativeTimeFormat) {
      const lang = 'en'
      const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
      const table = [
        ['year', 31536000],
        ['month', 2592000],
        ['week', 604800],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
      ]
      for (const [unit, seconds] of table) {
        const value = Math.round(diffSeconds / seconds)
        if (Math.abs(value) >= 1) return rtf.format(value, unit)
      }
      return rtf.format(diffSeconds, 'second')
    }

    // Fallback: simple English strings
    const abs = Math.abs(diffSeconds)
    const sign = diffSeconds < 0 ? 'ago' : 'from now'
    const choose = (n, s) => `${n} ${s}${n === 1 ? '' : 's'} ${sign}`
    if (abs < 3600) return choose(Math.round(abs / 60), 'minute')
    if (abs < 86400) return choose(Math.round(abs / 3600), 'hour')
    if (abs < 604800) return choose(Math.round(abs / 86400), 'day')
    if (abs < 2592000) return choose(Math.round(abs / 604800), 'week')
    if (abs < 31536000) return choose(Math.round(abs / 2592000), 'month')
    return choose(Math.round(abs / 31536000), 'year')
  } catch (error) {
    console.error('Error parsing timestamp:', error)
    return ''
  }
}

/**
 * Update all elements with data-timestamp attribute
 */
function updateRelativeTimes() {
  const timeElements = document.querySelectorAll('[data-timestamp]')

  timeElements.forEach((element) => {
    const timestamp = element.getAttribute('data-timestamp')
    const relativeTime = getRelativeTime(timestamp)

    if (relativeTime) {
      element.textContent = relativeTime
    }
  })
}

// Run on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateRelativeTimes)
} else {
  // DOM is already ready
  updateRelativeTimes()
}

// Optional: Update every 60 seconds to keep times current
setInterval(updateRelativeTimes, 60000)
