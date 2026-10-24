import type { MessageKey } from './i18n'

// Choices shared by onboarding and settings. Values are stored in progress; labels live in the i18n catalogs.
export const WHY = [
  ['💼', 'Job switch', 'options.why.switch', 'options.why.switchDesc'],
  ['🚀', 'Next level / promotion', 'options.why.promotion', 'options.why.promotionDesc'],
  ['🎓', 'Fresher / campus', 'options.why.fresher', 'options.why.fresherDesc'],
  ['🧠', 'Sharpening my skills', 'options.why.sharpen', 'options.why.sharpenDesc'],
  ['🎯', 'I have a specific interview coming up', 'options.why.specific', 'options.why.specificDesc'],
] as const satisfies readonly (readonly [string, string, MessageKey, MessageKey])[]

export const LEVELS = [
  ['options.level.new', 'options.level.newDesc', 1],
  ['options.level.some', 'options.level.someDesc', 2],
  ['options.level.lots', 'options.level.lotsDesc', 3],
  ['options.level.expert', 'options.level.expertDesc', 4],
] as const satisfies readonly (readonly [MessageKey, MessageKey, number])[]

export const WHEN = [
  ['🔥', 'options.when.week', 'week'],
  ['📅', 'options.when.month', 'month'],
  ['🗓️', 'options.when.quarter', 'quarter'],
  ['🤷', 'options.when.none', 'none'],
] as const satisfies readonly (readonly [string, MessageKey, string])[]

export const GOALS = [
  [20, 'options.goal.casual', 'options.goal.casualDesc'],
  [30, 'options.goal.regular', 'options.goal.regularDesc'],
  [50, 'options.goal.serious', 'options.goal.seriousDesc'],
  [100, 'options.goal.intense', 'options.goal.intenseDesc'],
] as const satisfies readonly (readonly [number, MessageKey, MessageKey])[]

export const REMIND = [
  ['🌅', 'options.remind.morning', 8],
  ['☀️', 'options.remind.afternoon', 13],
  ['🌆', 'options.remind.evening', 19],
  ['🌙', 'options.remind.night', 22],
] as const satisfies readonly (readonly [string, MessageKey, number])[]
