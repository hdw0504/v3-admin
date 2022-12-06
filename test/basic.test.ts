describe('Hi', () => {
  it('should works', () => {
    expect(1 + 1).toEqual(2)
  })

  it('test add', () => {
    const keys = ['ccy', 'tb']
    const arr = [
      { name: 'ccy' },
      { name: 'pdd' },
      { name: 'tb' },
      { name: 'shoppe' },
    ]
    function test(arr: { name: string; a?: 0 | 1 }[], keys: string[]) {
      const set = new Set(keys)
      arr.forEach((i) => {
        i.a = set.has(i.name) ? 1 : 0
      })

      return arr
    }
    expect(test(arr, keys)).toMatchInlineSnapshot(`
      [
        {
          "a": 1,
          "name": "ccy",
        },
        {
          "a": 0,
          "name": "pdd",
        },
        {
          "a": 1,
          "name": "tb",
        },
        {
          "a": 0,
          "name": "shoppe",
        },
      ]
    `)
  })
})
