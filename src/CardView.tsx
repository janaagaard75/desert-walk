import * as React from 'react'
import { Component } from 'react'
import { observer } from 'mobx-react'
import { Text } from 'react-native'
import { TextStyle } from 'react-native'
import { View } from 'react-native'
import { ViewStyle } from 'react-native'

import { Card } from './Card'
import { Settings } from './Settings'
import { Suit } from './Suit'

interface Props {
  card: Card
  isDraggable: boolean
  isInCorrectPlace: boolean
  shadow: boolean
}

@observer
export class CardView extends Component<Props, {}> {
  public render() {
    const shadowStyle: ViewStyle = {
      borderRadius: Settings.instance.borderRadius,
      height: Settings.instance.cardSize.height,
      width: Settings.instance.cardSize.width
    }
    if (this.props.shadow) {
      Object.assign(shadowStyle, {
        shadowColor: 'black',
        shadowOffset: {
          height: Math.floor(Settings.instance.cardSize.width / 20),
          width: Math.floor(Settings.instance.cardSize.width / 50)
        },
        shadowOpacity: 0.3,
        shadowRadius: Math.floor(Settings.instance.cardSize.width / 15)
      })
    }

    const cardStyle: ViewStyle = {
      alignItems: 'center',
      backgroundColor: this.backgroundColor(),
      borderColor: this.borderColor(),
      borderRadius: Settings.instance.borderRadius,
      borderStyle: 'solid',
      borderWidth: Settings.instance.borderWidth,
      height: Settings.instance.cardSize.height,
      overflow: 'hidden',
      padding: Math.floor(Settings.instance.cardSize.width / 20),
      width: Settings.instance.cardSize.width
    }

    const valueStyle: TextStyle = {
      color: this.suitColor(),
      fontSize: Math.floor(0.95 * Settings.instance.cardSize.width),
      fontWeight: '700',
      left: -Math.floor(Settings.instance.cardSize.width / 8),
      letterSpacing: -Math.floor(Settings.instance.cardSize.width / 15),
      position: 'absolute',
      top: -Math.floor(0.17 * Settings.instance.cardSize.width),
      width: Math.floor(1.22 * Settings.instance.cardSize.width) // Make space for the two digits in '10'.
    }

    const suitStyle: TextStyle = {
      backgroundColor: 'transparent',
      bottom: -Math.floor(Settings.instance.cardSize.width / 8),
      color: this.suitColor(),
      fontSize: Math.floor(Settings.instance.cardSize.width),
      fontWeight: '900',
      position: 'absolute',
      right: -Math.floor(0.12 * Settings.instance.cardSize.width)
    }

    return (
      <View style={shadowStyle}>
        <View style={cardStyle}>
          <Text style={valueStyle}>
            {this.props.card.displayValue}
          </Text>
          <Text style={suitStyle}>
            {this.valueText()}
          </Text>
        </View>
      </View>
    )
  }

  private backgroundColor(): string {
    if (this.props.isDraggable) {
      return 'white'
    }

    if (this.props.isInCorrectPlace) {
      return '#dde5ee'
    }

    return '#ddd'
  }

  private borderColor(): string {
    if (this.props.isInCorrectPlace) {
      return '#4a4'
    }

    if (this.props.isDraggable) {
      return 'black'
    }

    return '#888'
  }

  private suitColor(): string {
    if (this.props.card.suit === Suit.Clubs || this.props.card.suit === Suit.Spades) {
      if (this.props.isDraggable) {
        return '#000'
      }
      else {
        return '#666'
      }
    }
    else {
      if (this.props.isDraggable) {
        return '#f00'
      }
      else {
        return '#f66'
      }
    }
  }

  private valueText(): string {
    switch (this.props.card.suit) {
      case Suit.Clubs:
        return '\u2667'

      case Suit.Diamonds:
        return '\u2662'

      case Suit.Hearts:
        return '\u2661'

      case Suit.Spades:
        return '\u2664'
    }
  }
}