import { useState } from 'react'
import { courseIndex } from '../data/load'
import { roadmaps } from '../data/roadmaps'
import { getLang, setLang, tr } from '../lib/i18n'
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
  const importJson = (f: File | undefined) => f?.text().then((t) => { try { importState(t); flash() } catch { alert(tr('Invalid file')) } })

  return (
    <div className="page">
      <h1 className="flex items-center gap-3">{tr('Settings')} {saved && <span className="text-sm font-extrabold text-(--green)">✓ {tr('Saved')}</span>}</h1>
      <p className="muted">{tr('Yahan apna naam, goal, track aur language badal sakte ho. Sab kuch turant save ho jata hai.')}</p>

      <section className={card}>
        <h3 className="mt-0!">👤 {tr('Profile')}</h3>
        <label className={label} htmlFor="s-name">{tr('Naam')}</label>
        <input id="s-name" className={field} value={prof?.name ?? ''} maxLength={24} placeholder={tr('Tumhara naam (optional)')}
          onChange={(e) => setProfile({ name: e.target.value })} onBlur={flash} />

        <span className={label + ' mt-5'}>{tr('Prep kyun kar rahe ho?')}</span>
        <Seg wrap value={prof?.why ?? ''} onChange={(v) => { setProfile({ why: v }); flash() }} options={WHY.map(([ico, t]) => [t, `${ico} ${tr(t)}`] as const)} />

        <span className={label + ' mt-5'}>{tr('Abhi kitna aata hai?')}</span>
        <Seg wrap value={prof?.level ?? 0} onChange={(v) => { setProfile({ level: v }); flash() }} options={LEVELS.map(([t], i) => [i, tr(t)] as const)} />

        <span className={label + ' mt-5'}>{tr('Interview kab tak hai?')}</span>
        <Seg wrap value={prof?.when ?? ''} onChange={(v) => { setProfile({ when: v }); flash() }} options={WHEN.map(([ico, t, v]) => [v, `${ico} ${tr(t)}`] as const)} />
      </section>

      <section className={card}>
        <h3 className="mt-0!">🎯 {tr('Learning')}</h3>
        <label className={label} htmlFor="s-track">{tr('Meri track')}</label>
        <select id="s-track" className={field} value={p.track} onChange={(e) => { setTrack(e.target.value); flash() }}>
          <option value="">{tr('Koi track nahi')}</option>
          {roadmaps.map((r) => <option key={r.id} value={r.id}>{r.icon} {r.title}</option>)}
        </select>

        <label className={label + ' mt-5'} htmlFor="s-course">{tr('Active course')}</label>
        <select id="s-course" className={field} value={p.activeCourse} onChange={(e) => { setActiveCourse(e.target.value); flash() }}>
          {courseIndex.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.title}</option>)}
        </select>

        <span className={label + ' mt-5'}>{tr('Daily goal')}</span>
        <Seg wrap value={p.goal} onChange={(v) => { setGoal(v); flash() }} options={GOALS.map(([xp, t]) => [xp, `⚡ ${xp} · ${t}`] as const)} />
      </section>

      <section className={card}>
        <h3 className="mt-0!">🎨 {tr('Preferences')}</h3>
        <Row title={tr('Language')} desc={tr('App ki UI language. Lessons English mein hi rehte hain.')}>
          <Seg value={lang} onChange={(v) => setLang(v)} options={[['hi', 'Hinglish'], ['en', 'English']] as const} />
        </Row>
        <Row title={tr('Theme')} desc={tr('Auto = phone / computer ki setting follow karta hai.')}>
          <Seg value={theme} onChange={(v) => setThemePref(v)} options={[['light', '☀️ Light'], ['system', '💻 Auto'], ['dark', '🌙 Dark']] as const} />
        </Row>
        <Row title={tr('Sound effects')}>
          <Switch on={prefs.sound} label={tr('Sound effects')} onChange={(v) => { setPref('sound', v); if (v) setTimeout(sfx.correct, 30) }} />
        </Row>
        <Row title={tr('Saare lessons unlock rakho')} desc={tr('Lock band — koi bhi lesson kholo.')}>
          <Switch on={prefs.unlockAll} label={tr('Saare lessons unlock rakho')} onChange={(v) => setPref('unlockAll', v)} />
        </Row>
      </section>

      <section className={card}>
        <h3 className="mt-0!">📅 {tr('Daily reminder')}</h3>
        <p className="muted small">{tr('Calendar file download karo — roz isi time par repeat hogi.')}</p>
        <Seg wrap value={remind ?? -1} onChange={(v) => setRemind(v)} options={REMIND.map(([ico, t, h]) => [h as number, `${ico} ${tr(t)} · ${h > 12 ? h - 12 : h}${h >= 12 ? 'pm' : 'am'}`] as const)} />
        {remind !== null && <button className="btn btn-outline mt-3" onClick={() => downloadReminder(remind)}>📥 {tr('Calendar file (.ics) download')}</button>}
      </section>

      <section className={card}>
        <h3 className="mt-0!">💾 {tr('Data')}</h3>
        <p className="muted small">{tr('Progress is browser mein save hoti hai. Backup/restore ke liye export-import karo.')}</p>
        <div className="row-btns">
          <button className="btn btn-outline" onClick={exportJson}>{tr('Export')}</button>
          <label className="btn btn-outline">{tr('Import')}<input type="file" accept="application/json" hidden onChange={(e) => importJson(e.target.files?.[0])} /></label>
          <button className="btn btn-outline" onClick={() => { if (confirm(tr('Onboarding dobara shuru hoga (progress safe rahegi).'))) { setProfile({ onboarded: false }); go() } }}>🔄 {tr('Onboarding dobara')}</button>
          <button className="btn btn-outline danger" onClick={() => { if (confirm(tr('Saari progress delete ho jaayegi. Pakka?'))) resetAll() }}>{tr('Reset')}</button>
        </div>
      </section>
    </div>
  )
}
