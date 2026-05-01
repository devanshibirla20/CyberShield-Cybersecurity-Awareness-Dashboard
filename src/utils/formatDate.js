export function formatDate(iso) {
  if (!iso) return 'Unknown'
  try {
    return new Date(iso).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })
  } catch { return 'Invalid' }
}

export function timeAgo(iso) {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d > 0)  return `${d}d ago`
  if (h > 0)  return `${h}h ago`
  if (m > 0)  return `${m}m ago`
  return 'Just now'
}
