import BigNumber from 'bignumber.js'
import lpAprs from 'config/constants/lpAprs.json'
import { getPoolApr, getFarmApr } from 'utils/apr'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'

jest.mock('../../config/constants/lpAprs.json', () => ({
  '0x0ed7e52944161450477ee417de9cd3a859b14fd0': 10.5,
}))

describe('getPoolApr', () => {
  it(`returns null when parameters are missing`, () => {
    const apr = getPoolApr(null, null, null, null)
    expect(apr).toBeNull()
  })
  it(`returns null when APR is infinite`, () => {
    const apr = getPoolApr(0, 0, 0, 0)
    expect(apr).toBeNull()
  })
  it(`get the correct pool APR`, () => {
    const apr = getPoolApr(10, 1, 100000, 1)
    expect(apr).toEqual(1051.2)
  })
})

describe.skip('getFarmApr', () => {
  it(`returns null when parameters are missing`, () => {
    const { cakeRewardsApr, lpRewardsApr } = getFarmApr(null, null, null, null)
    expect(cakeRewardsApr).toBeNull()
    expect(lpRewardsApr).toEqual(0)
  })
  it(`returns null when APR is infinite`, () => {
    const { cakeRewardsApr, lpRewardsApr } = getFarmApr(BIG_ZERO, BIG_ZERO, BIG_ZERO, '')
    expect(cakeRewardsApr).toBeNull()
    expect(lpRewardsApr).toEqual(0)
  })
  it(`get the correct pool APR`, () => {
    const { cakeRewardsApr, lpRewardsApr } = getFarmApr(BIG_TEN, new BigNumber(1), new BigNumber(100000), '')
    expect(cakeRewardsApr).toEqual(4204800)
    expect(lpRewardsApr).toEqual(0)
  })
  it(`get the correct pool APR combined with LP APR`, () => {
    const { cakeRewardsApr, lpRewardsApr } = getFarmApr(
      BIG_TEN,
      new BigNumber(1),
      new BigNumber(100000),
      '0x0ed7e52944161450477ee417de9cd3a859b14fd0',
    )
    expect(cakeRewardsApr).toEqual(4204800)
    expect(lpRewardsApr).toEqual(lpAprs['0x0ed7e52944161450477ee417de9cd3a859b14fd0'])
  })
})
