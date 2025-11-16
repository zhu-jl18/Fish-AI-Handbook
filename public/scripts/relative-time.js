/**
 * Client-side script to convert ISO timestamps to relative time format
 * (e.g., "3 hours ago", "2 days ago")
 *
 * This script finds all elements with a data-timestamp attribute and
 * updates their text content to show a human-readable relative time.
 */

/**
 * Calculate relative time from an ISO timestamp
 * @param {string} isoTimestamp - ISO 8601 timestamp string
 * @returns {string} - Relative time string (e.g., "3 hours ago")
 */
function getRelativeTime(isoTimestamp) {
  if (!isoTimestamp) return ''

  try {
    const timestamp = new Date(isoTimestamp)
    const now = new Date()
    const diffMs = now - timestamp

    // Handle future dates
    if (diffMs < 0) {
      return 'just now'
    }

    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)
    const diffWeeks = Math.floor(diffDays / 7)
    const diffMonths = Math.floor(diffDays / 30)
    const diffYears = Math.floor(diffDays / 365)

    // Less than a minute
    if (diffSeconds < 60) {
      return 'just now'
    }

    // Less than an hour
    if (diffMinutes < 60) {
      return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`
    }

    // Less than a day
    if (diffHours < 24) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`
    }

    // Less than a week
    if (diffDays < 7) {
      return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`
    }

    // Less than a month
    if (diffDays < 30) {
      return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`
    }

    // Less than a year
    if (diffDays < 365) {
      return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`
    }

    // Years ago
    return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`
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
