import * as React from 'react'
import { Component } from 'react'
import { Text } from 'react-native'
import { TextStyle } from 'react-native'
import { View } from 'react-native'
import { ViewStyle } from 'react-native'

import { Suit } from './Suit'

interface Props {
  value: number
  suit: Suit
}

export class CardView extends Component<Props, {}> {
  public render() {
    const cardStyle: ViewStyle = {
      alignItems: 'center',
      backgroundColor: '#fee',
      borderColor: 'black',
      borderRadius: 5,
      borderWidth: 1,
      height: 60,
      opacity: 1,
      padding: 2,
      shadowColor: 'black',
      shadowOffset: {
        height: 2,
        width: 1
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      width: 40
    }

    const textStyle: TextStyle = {
      color: Suit.isBlack(this.props.suit) ? 'black' : 'red'
    }

    return (
      <View style={cardStyle}>
        <Text style={textStyle}>
          {this.getSuitUnicode(this.props.suit)} {this.props.value}
        </Text>
      </View>
    )
  }

  private getSuitUnicode(suit: Suit): string {
    switch (suit) {
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