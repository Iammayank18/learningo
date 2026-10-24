import { t } from './i18n'

/** Download a repeating daily .ics reminder at the given hour. */
export function downloadReminder(hour: number) {
  const d = new Date(); d.setHours(hour, 0, 0, 0)
  const p = (n: number) => String(n).padStart(2, '0')
  const stamp = `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(hour)}0000`
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Prep//EN', 'BEGIN:VEVENT', `UID:prep-daily-${Date.now()}@prep`, `DTSTAMP:${stamp}`, `DTSTART:${stamp}`, 'DURATION:PT15M', 'RRULE:FREQ=DAILY',
    'SUMMARY:' + t('ics.summary'), 'DESCRIPTION:' + t('ics.description'), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  a.download = 'prep-daily-reminder.ics'; a.click(); URL.revokeObjectURL(a.href)
}
