'use strict'

import React, { PropTypes } from 'react'
import { View, Image } from 'react-native'
import { HTMLStyle } from '../../styles/'
import HTMLRender from 'react-native-html-render'
import Dimensions from 'Dimensions'
const { width } = Dimensions.get('window')

class HTMLContent extends React.Component {
  static propTypes = {
    renderNode: PropTypes.func,
    stylesheet: PropTypes.object,
    value: PropTypes.string,
    width: PropTypes.number,
  }
  static defaultProps = {
    value: '',
    width,
  }

  constructor(props) {
    super(props)
    this.state = { size: {} }
  }

  componentWillMount() {
    const arr = this.props.value.match(/src="\S*"/g)
    if (arr) {
      arr.map((str) => str.substring(5, str.length - 1).replace('&amp;', '&'))
        .forEach((str) => {
          this.state.size[str] = { width: 0, height: 0 }
        })
    }
  }

  renderHTML(node, index, parent, type) {
    const name = node.name
    if (name === 'img') {
      let uri = node.attribs.src
      if (/^\/\/dn-cnode\.qbox\.me\/.*/.test(uri)) {
        uri = `https:${uri}`
      }
      if (!this.state.size[uri] || this.state.size[uri].width === 0) {
        Image.getSize(uri, (wid, hei) => {
          const newSize = this.state.size
          newSize[uri] = { width: this.props.width, height: hei / wid * this.props.width }
          this.setState({
            size: newSize,
          })
        })
      }
      return (
        <View
          key={index}
          style={HTMLStyle.imgWrapper}>
          <Image source={{ uri }}
                 style={[HTMLStyle.img, this.state.size[uri]]}/>
        </View>
      )
    }
  }

  render() {
    return (
      <HTMLRender
        renderNode={this.props.renderNode || this.renderHTML.bind(this)}
        stylesheet={this.props.stylesheet || HTMLStyle}
        value={this.props.value}
      />
    )
  }
}

export default HTMLContent
