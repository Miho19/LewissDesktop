const curtainOption = [
  'Separate Lining',
  'Unlined Curtain',
  'Lined Curtain',
  'Sheer Curtain',
  'Interlined Curtain'
] as const

export type Curtain = (typeof curtainOption)[number]

// const _curtainProductId = [
//   'sheer-curtain-inside',
//   'sheer-curtain-below-sill',
//   'sheer-curtain-floor-length',
//   'sheer-curtain-floor-ceiling',
//   'lined-curtain-below-sill',
//   'lined-curtain-floor-length',
//   'lined-curtain-floor-ceiling',
//   'interlined-curtain-below-sill',
//   'interlined-curtain-floor-length',
//   'interlined-curtain-floor-ceiling',

//   'separate-lining-below-sill',
//   'separate-lining-floor-length',
//   'separate-lining-floor-ceiling',

//   'unlined-curtain-below-sill',
//   'unlined-curtain-floor-length',
//   'unlined-curtain-floor-ceiling'
// ] as const
