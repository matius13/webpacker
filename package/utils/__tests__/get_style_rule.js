const chdirApp = () => process.chdir('test/test_app')
const chdirCwd = () => process.chdir(process.cwd())
chdirApp()

const getStyleRule = require('../get_style_rule')

describe('getStyleRule', () => {
  afterAll(chdirCwd)

  test('returns style based on test', () => {
    const cssRule = getStyleRule(/\.(css)$/i)
    const expectation = {
      test: /\.(css)$/i,
      exclude: /\.module\.[a-z]+$/
    }

    expect(cssRule).toMatchObject(expectation)
  })
})
