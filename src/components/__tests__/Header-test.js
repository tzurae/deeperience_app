import 'react-native'
import React from 'react'
import Header from '../Header'
import renderer from 'react/lib/ReactTestRenderer'
describe('<Header />', () => {
  it('render if Head_text is empty', () => {
    const Header_Text = ''
    const tree = renderer.create(<Header Header_Text={Header_Text}/>)
    expect(tree).toMatchSnapshot()
  })
  it('render if Head_text not empty', () => {
    const Header_Text = 'test'
    const tree = renderer.create(<Header Header_Text={Header_Text}/>)
    expect(tree).toMatchSnapshot( )
  })
})