import * as React from "react"
import { Component } from "react"
import { G } from "react-native-svg"
import { observer } from "mobx-react"
import { Path } from "react-native-svg"
import Svg from "react-native-svg"

import { Suit } from "./model/Suit"
import { SuitHelper } from "./model/SuitHelper"

interface Props {
  size: number
  suit: Suit
}

@observer
export class SuitView extends Component<Props, {}> {
  public render() {
    return (
      <Svg height={this.props.size} viewBox="0 0 60 60" width={this.props.size}>
        <G>
          <Path
            d={SuitView.getPath(this.props.suit)}
            fill={SuitHelper.getColor(this.props.suit)}
          />
        </G>
      </Svg>
    )
  }

  private static getPath(suit: Suit): string {
    switch (suit) {
      case Suit.Clubs:
        return "M38.719,60 C36.316,56.842 34.943,54.645 33.913,51.831 C32.883,49.153 32.059,43.799 32.059,39.748 C32.059,37.071 32.128,36.659 32.677,36.659 C33.021,36.659 33.295,37.002 33.432,37.62 C33.982,40.503 34.119,40.847 34.943,42.426 C37.414,47.231 41.533,49.977 46.407,49.977 C49.84,49.977 53.478,48.398 55.881,45.858 C58.284,43.318 59.519,39.886 59.519,35.904 C59.519,28.833 53.684,23.41 46.064,23.41 C42.494,23.41 40.297,24.233 37.826,26.568 C37.14,27.254 36.865,27.391 36.453,27.391 C36.11,27.391 35.767,27.117 35.767,26.773 C35.767,26.43 36.041,26.018 36.659,25.538 C37.414,24.92 38.238,24.096 38.993,23.135 C41.67,20.046 42.906,16.819 42.906,13.249 C42.906,5.973 37.002,-0 29.863,-0 C25.606,-0 21.281,2.403 19.016,5.904 C17.78,7.895 17.025,10.503 17.025,13.043 C17.025,16.751 18.81,21.076 21.487,23.684 C24.165,26.362 24.165,26.362 24.165,26.705 C24.165,27.117 23.822,27.46 23.41,27.46 C23.135,27.46 22.86,27.323 22.174,26.773 C19.016,24.233 16.751,23.41 13.387,23.41 C5.904,23.41 0.481,28.833 0.481,36.453 C0.481,43.73 6.247,49.84 13.112,49.84 C16.613,49.84 19.565,48.741 21.831,46.545 C24.096,44.416 25.675,41.808 26.156,39.268 C26.636,36.728 26.636,36.659 27.185,36.659 C27.666,36.659 27.872,37.14 27.872,38.169 C27.872,42.838 27.391,47.094 26.499,50.046 C25.469,53.341 24.439,55.4 21.213,60 C23.89,59.588 26.224,59.451 29.657,59.451 C32.952,59.451 35.629,59.588 38.719,60 z"

      case Suit.Diamonds:
        return "M30.005,-0 L7.244,29.589 L30.005,60 L52.766,29.589 z"

      case Suit.Hearts:
        return "M30.001,60 C31.537,58.4 31.537,58.4 38.321,51.232 C44.593,44.64 48.689,39.328 51.889,33.632 C54.641,28.768 55.793,24.736 55.793,19.936 C55.793,13.792 53.745,9.12 49.841,6.432 C47.601,4.896 44.913,4 42.225,4 C39.921,4 37.233,4.64 35.697,5.472 C33.329,6.816 31.473,9.696 30.897,12.832 C30.577,14.752 30.385,15.136 30.001,15.136 C29.617,15.136 29.553,14.944 29.105,12.832 C28.593,9.952 26.929,7.264 24.753,5.728 C23.089,4.576 21.041,4 18.289,4 C13.489,4 9.969,5.728 7.409,9.312 C5.425,12.128 4.209,16.096 4.209,19.808 C4.209,26.08 7.345,33.504 13.617,41.76 C17.841,47.392 18.993,48.672 30.001,60 z"

      case Suit.Spades:
        return "M30.102,0 C27.986,3.072 27.167,4.164 23.959,8.123 C12.765,21.911 12.765,21.911 10.58,25.256 C7.031,30.785 5.734,34.334 5.734,38.498 C5.734,46.075 10.512,51.263 17.474,51.263 C20.751,51.263 23.208,50.239 24.642,48.259 C26.007,46.416 26.758,44.915 27.509,42.457 C27.577,42.184 27.713,42.048 27.918,42.048 C28.259,42.048 28.464,42.389 28.464,42.935 C28.464,44.232 27.577,48.669 26.894,50.922 C25.666,54.812 24.232,57.133 21.502,60 C24.915,59.317 27.167,59.113 30.102,59.113 C32.014,59.113 33.925,59.317 38.362,60 C35.7,56.792 34.403,54.539 33.242,51.399 C32.355,48.805 31.536,44.846 31.536,43.14 C31.536,42.526 31.741,42.048 32.082,42.048 C32.423,42.048 32.628,42.457 32.901,43.754 C34.061,48.601 37.474,51.263 42.526,51.263 C44.983,51.263 47.304,50.58 49.283,49.215 C52.287,47.167 54.266,43.003 54.266,38.703 C54.266,36.109 53.242,32.218 51.741,29.352 C50.102,26.143 47.713,22.662 42.594,16.177 C34.949,6.416 34.949,6.416 30.102,0 z"
    }
  }
}
