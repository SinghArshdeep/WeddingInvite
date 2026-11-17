import { weddingConfig, type WeddingDateConfig } from '@/config/wedding'

function timeZoneOffsetMs(utcMs: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs))
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  return asUtc - utcMs
}

/** Converts the configured local wedding date/time into an absolute epoch (ms). */
export function getWeddingTimestamp(config: WeddingDateConfig = weddingConfig.wedding) {
  const [y, m, d] = config.date.split('-').map(Number)
  const [hh, mm] = config.time.split(':').map(Number)
  const naive = Date.UTC(y, m - 1, d, hh, mm)
  const first = naive - timeZoneOffsetMs(naive, config.timeZone)
  // Re-check once to settle DST boundaries.
  return naive - timeZoneOffsetMs(first, config.timeZone)
}

/** Calendar labels derived purely from the configured date (timezone-independent). */
export function getWeddingDateLabels(config: WeddingDateConfig = weddingConfig.wedding) {
  const [y, m, d] = config.date.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...opts }).format(date)
  return {
    weekday: fmt({ weekday: 'long' }),
    day: fmt({ day: 'numeric' }),
    month: fmt({ month: 'long' }),
    year: fmt({ year: 'numeric' }),
    full: fmt({ day: 'numeric', month: 'long', year: 'numeric' }),
  }
}
