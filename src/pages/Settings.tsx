import { useState } from 'react'
import { courseIndex } from '../data/load'
import { roadmaps } from '../data/roadmaps'
import { getLang, setLang, t } from '../lib/i18n'
import { downloadReminder } from '../lib/ics'
import { GOALS, LEVELS, REMIND, WHEN, WHY } from '../lib/options'
import { setPref, usePrefs } from '../lib/prefs'
import { go } from '../lib/router'
import { sfx } from '../lib/sound'
import { setThemePref, useTheme } from '../lib/theme'
import { getProgress, importState, resetAll, setActiveCourse, setGoal, setProfile, setTrack, useProgress } from '../lib/store'

const card = 'mb-4 rounded-3xl border-2 border-(--line) bg-(--card) p-5 shadow-[0_4px_0_var(--line)]'
const label = 'mb-2 block text-[12px] font-extrabold tracking-[.12em] text-(--muted) uppercase'
const field = 'w-full rounded-2xl border-2 border-(--line) bg-(--bg2) px-4 py-3 text-base font-bold text-(--head) outline-none focus:border-(--blue)'

function Seg<T extends string | number>({ value, options, onChange, wrap }: { value: T; options: readonly (readonly [T, string])[]; onChange: (v: T) => void; wrap?: boolean }) {
  return (
    <div className={'flex gap-2 ' + (wrap ? 'flex-wrap' : '')} role="group">
      {options.map(([v, l]) => (
        <button key={String(v)} onClick={() => { if (v !== value) { sfx.select(); onChange(v) } }}
          className={'cursor-pointer rounded-xl border-2 border-b-4 px-3.5 py-2 text-sm font-extrabold transition-colors ' + (v === value ? 'border-(--blue) bg-(--sel-bg) text-(--blue-d)' : 'border-(--line) bg-(--card) text-(--text) hover:bg-(--bg2)')}>
          {l}
        </button>
      ))}
    </div>
  )
}

function Row({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t-2 border-(--line) py-3.5 first:border-t-0 first:pt-0 last:pb-0">
      <div className="min-w-0"><div className="font-extrabold text-(--head)">{title}</div>{desc && <div className="text-[13px] text-(--muted)">{desc}</div>}</div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function Switch({ on, onChange, label: aria }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button role="switch" aria-checked={on} aria-label={aria} onClick={() => { sfx.select(); onChange(!on) }}
      className={'relative h-8 w-14 cursor-pointer rounded-full border-0 transition-colors ' + (on ? 'bg-(--green)' : 'bg-(--line)')}>
      <span className={'absolute top-1 size-6 rounded-full bg-white shadow transition-all ' + (on ? 'left-7' : 'left-1')} />
    </button>
  )
}

export function Settings() {
  const p = useProgress()
  const prefs = usePrefs()
  const lang = getLang()
  const { pref: theme } = useTheme()
  const [remind, setRemind] = useState<number | null>(null)
  const [saved, setSaved] = useState(false)
  const prof = p.profile

  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 1200) }
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(getProgress(), null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob); a.download = 'interview-prep-progress.json'; a.click()
    URL.revokeObjectURL(a.href)
  }
  const importJson = (f: File | undefined) => f?.text().then((text) => { try { importState(text); flash() } catch { alert(t('common.invalidFile')) } })

  return (
    <div className="page">
      <h1 className="flex items-center gap-3">{t('common.settings')} {saved && <span className="text-sm font-extrabold text-(--green)">✓ {t('common.saved')}</span>}</h1>
      <p className="muted">{t('settings.subtitle')}</p>

      <section className={card}>
        <h3 className="mt-0!">👤 {t('settings.profile')}</h3>
        <label className={label} htmlFor="s-name">{t('settings.name')}</label>
        <input id="s-name" className={field} value={prof?.name ?? ''} maxLength={24} placeholder={t('onboarding.namePlaceholder')}
          onChange={(e) => setProfile({ name: e.target.value })} onBlur={flash} />

        <span className={label + ' mt-5'}>{t('settings.why')}</span>
        <Seg wrap value={prof?.why ?? ''} onChange={(v) => { setProfile({ why: v }); flash() }} options={WHY.map(([ico, value, labelKey]) => [value, `${ico} ${t(labelKey)}`] as const)} />

        <span className={label + ' mt-5'}>{t('settings.level')}</span>
        <Seg wrap value={prof?.level ?? 0} onChange={(v) => { setProfile({ level: v }); flash() }} options={LEVELS.map(([labelKey], i) => [i, t(labelKey)] as const)} />

        <span className={label + ' mt-5'}>{t('settings.when')}</span>
        <Seg wrap value={prof?.when ?? ''} onChange={(v) => { setProfile({ when: v }); flash() }} options={WHEN.map(([ico, labelKey, v]) => [v, `${ico} ${t(labelKey)}`] as const)} />
      </section>

      <section className={card}>
        <h3 className="mt-0!">🎯 {t('settings.learning')}</h3>
        <label className={label} htmlFor="s-track">{t('settings.track')}</label>
        <select id="s-track" className={field} value={p.track} onChange={(e) => { setTrack(e.target.value); flash() }}>
          <option value="">{t('settings.noTrack')}</option>
          {roadmaps.map((r) => <option key={r.id} value={r.id}>{r.icon} {t(r.titleKey)}</option>)}
        </select>

        <label className={label + ' mt-5'} htmlFor="s-course">{t('settings.activeCourse')}</label>
        <select id="s-course" className={field} value={p.activeCourse} onChange={(e) => { setActiveCourse(e.target.value); flash() }}>
          {courseIndex.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.title}</option>)}
        </select>

        <span className={label + ' mt-5'}>{t('settings.dailyGoal')}</span>
        <Seg wrap value={p.goal} onChange={(v) => { setGoal(v); flash() }} options={GOALS.map(([xp, labelKey]) => [xp, `⚡ ${xp} · ${t(labelKey)}`] as const)} />
      </section>

      <section className={card}>
        <h3 className="mt-0!">🎨 {t('settings.preferences')}</h3>
        <Row title={t('settings.language')} desc={t('settings.languageHint')}>
          <Seg value={lang} onChange={(v) => setLang(v)} options={[['en', 'English'], ['hi', 'Hinglish']] as const} />
        </Row>
        <Row title={t('settings.theme')} desc={t('settings.themeAuto')}>
          <Seg value={theme} onChange={(v) => setThemePref(v)} options={[['light', t('settings.light')], ['system', t('settings.auto')], ['dark', t('settings.dark')]] as const} />
        </Row>
        <Row title={t('settings.sound')}>
          <Switch on={prefs.sound} label={t('settings.sound')} onChange={(v) => { setPref('sound', v); if (v) setTimeout(sfx.correct, 30) }} />
        </Row>
        <Row title={t('settings.unlockAll')} desc={t('settings.unlockAllHint')}>
          <Switch on={prefs.unlockAll} label={t('settings.unlockAll')} onChange={(v) => setPref('unlockAll', v)} />
        </Row>
      </section>

      <section className={card}>
        <h3 className="mt-0!">📅 {t('settings.reminder')}</h3>
        <p className="muted small">{t('settings.reminderHint')}</p>
        <Seg wrap value={remind ?? -1} onChange={(v) => setRemind(v)} options={REMIND.map(([ico, labelKey, h]) => [h as number, `${ico} ${t(labelKey)} · ${h > 12 ? h - 12 : h}${h >= 12 ? 'pm' : 'am'}`] as const)} />
        {remind !== null && <button className="btn btn-outline mt-3" onClick={() => downloadReminder(remind)}>📥 {t('settings.downloadIcs')}</button>}
      </section>

      <section className={card}>
        <h3 className="mt-0!">💾 {t('settings.data')}</h3>
        <p className="muted small">{t('settings.dataHint')}</p>
        <div className="row-btns">
          <button className="btn btn-outline" onClick={exportJson}>{t('common.export')}</button>
          <label className="btn btn-outline">{t('common.import')}<input type="file" accept="application/json" hidden onChange={(e) => importJson(e.target.files?.[0])} /></label>
          <button className="btn btn-outline" onClick={() => { if (confirm(t('settings.redoOnboardingConfirm'))) { setProfile({ onboarded: false }); go() } }}>🔄 {t('settings.redoOnboarding')}</button>
          <button className="btn btn-outline danger" onClick={() => { if (confirm(t('settings.resetConfirm'))) resetAll() }}>{t('common.reset')}</button>
        </div>
      </section>
    </div>
  )
}
