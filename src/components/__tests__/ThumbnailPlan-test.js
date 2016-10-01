import React from 'react'
import ThumbnailPlan from '../ThumbnailPlan'
import renderer from 'react/lib/ReactTestRenderer'

describe('<ThumbnailPlan />', () => {
  it('should rendered correctly', () => {
    let props = {
      title: 'test',
      dayInfo: 'two days one night',
      guide: 'john',
      startNumber: '8',
      watchNumber: '7',
      numOfPurchase: '8787',
      cost: '7878',
      unit: 'TW',
    }
    const tree = renderer.create(<ThumbnailPlan {...props}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})