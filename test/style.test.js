require('reify')

const test = require('tape')
const { mergeStyles } = require('../src/style')

test('should merge style objects', (t) => {
  t.plan(1)

  t.deepEqual(
    mergeStyles({ marginTop: 138 }, { color: 'red' }),
    [
      { marginTop: 138 },
      { color: 'red' }
    ]
  )

  t.end()
})

test('should flattern style arrays', (t) => {
  t.plan(1)

  t.deepEqual(
    mergeStyles({ marginTop: 1 }, [{ color: 'red' }, { borderRight: 10 }]),
    [
      { marginTop: 1 },
      { color: 'red' },
      { borderRight: 10 }
    ]
  )

  t.end()
})

test('should merge multiple args', (t) => {
  t.plan(1)

  t.deepEqual(
    mergeStyles(
      { marginTop: 1 },
      [{ color: 'red' }, { borderRight: 10 }],
      { padding: 5 },
      6,
      [5, 7, { paddingTop: 10 }]
    ),
    [
      { marginTop: 1 },
      { color: 'red' },
      { borderRight: 10 },
      { padding: 5 },
      6,
      5,
      7,
      { paddingTop: 10 }
    ]
  )

  t.end()
})
