// Choices shared by onboarding and settings. Strings are Hinglish keys — translate with tr() when rendering.
export const WHY = [
  ['💼', 'Job switch', 'Nayi job ke liye interviews crack karne hain'],
  ['🚀', 'Next level / promotion', 'Senior ya staff role ki taraf badhna hai'],
  ['🎓', 'Fresher / campus', 'Pehli job ya placements ki taiyari'],
  ['🧠', 'Skills sharpen karna', 'Concepts pakke karne hain, jaldi nahi'],
  ['🎯', 'Specific interview aa raha hai', 'Time kam hai, focus chahiye'],
] as const

export const LEVELS = [
  ['Bilkul naya hoon', 'Basics se shuru karna hai', 1],
  ['Thoda-bahut aata hai', 'Kuch concepts pata hain', 2],
  ['Kaafi aata hai', 'Interview-level revise karna hai', 3],
  ['Expert', 'Sirf gaps dhoondhne hain', 4],
] as const

export const WHEN = [
  ['🔥', 'Is hafte mein', 'week'],
  ['📅', '1 mahine ke andar', 'month'],
  ['🗓️', '2-3 mahine mein', 'quarter'],
  ['🤷', 'Abhi pata nahi', 'none'],
] as const

export const GOALS = [
  [20, 'Casual', '~3 min / din'],
  [30, 'Regular', '~5 min / din'],
  [50, 'Serious', '~8 min / din'],
  [100, 'Intense', '~15 min / din'],
] as const

export const REMIND = [['🌅', 'Subah', 8], ['☀️', 'Dopahar', 13], ['🌆', 'Shaam', 19], ['🌙', 'Raat', 22]] as const
