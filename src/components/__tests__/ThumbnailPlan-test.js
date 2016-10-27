import React from 'react'
import ThumbnailPlan from '../ThumbnailPlan'
import renderer from 'react-test-renderer'

describe('<ThumbnailPlan />', () => {
  it('should rendered correctly', () => {
    const props = {
      title: 'test',
      dayInfo: 'two days one night',
      guideName: 'John',
      startNum: 8,
      watchNum: 7,
      purchaseNum: 8787,
      price: 7878,
      unit: 'NTD',
      tags: ['asd', 'das'],
    }
    const tree = renderer.create(<ThumbnailPlan {...props}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
