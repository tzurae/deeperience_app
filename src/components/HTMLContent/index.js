'use strict'

import React, { PropTypes } from 'react'
import { View, Image } from 'react-native'
import { HTMLStyle } from '../../styles/'
import HTMLRender from 'react-native-html-render'
import { width } from '../../lib/dimensions'

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
    this.setImageSize(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    this.setImageSize(nextProps.value)
  }

  setImageSize(value) {
    const arr = value.match(/src="\S*"/g)
    if (arr) {
      arr.map((str) => str.substring(5, str.length - 1).replace('&amp;', '&'))
        .forEach((str) => {
          if (!this.state.size[str]) {
            Image.getSize(str, (wid, hei) => {
              this.setState({
                size: { ...this.state.size,
                  [str]: { width: this.props.width,
                    height: hei / wid * this.props.width } } })
            })
          }
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
