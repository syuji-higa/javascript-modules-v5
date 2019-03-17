import { createArray } from './array'

describe('models/array', () => {
  describe('createArray()', () => {
    test('should be created 2 "sample" string array', () => {
      expect(createArray(2, 'sample')).toEqual(['sample', 'sample'])
    })
    test('should be created 3 "0" number array', () => {
      expect(createArray(3, 0)).toEqual([0, 0, 0])
    })
    test('should be created empty array', () => {
      expect(createArray(0, '')).toEqual([])
    })
  })
})
