import * as React from 'react'
import { Animated } from 'react-native'
import { Component } from 'react'
import { Easing } from 'react-native'
import { observer } from 'mobx-react'
import { PanResponder } from 'react-native'
import { PanResponderInstance } from 'react-native'

import { Card } from './Card'
import { CardView } from './CardView'
import { Point } from './Point'
import { Rectangle } from './Rectangle'

interface Props {
  card: Card
  correctlyPlaced: boolean
  draggable: boolean
  onCardDragged: (cardRectangle: Rectangle) => void
  onCardDropped: () => void
  onDragStarted: () => void
  startPosition: Point
}

enum VisualState {
  Animating,
  Dragging,
  Idle
}

interface State {
  visualState: VisualState
}

@observer
export class DraggableCardView extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      visualState: VisualState.Idle
    }

    this.animatedPosition = new Animated.ValueXY()

    this.panResponder = PanResponder.create({
      onPanResponderEnd: (e, gestureState) => {
        this.props.onCardDropped()

        this.setState({
          visualState: VisualState.Animating
        })

        // TODO: Fix the animation after a card has been moved.
        Animated.timing(
          this.animatedPosition,
          {
            duration: 200,
            easing: Easing.elastic(1),
            toValue: {
              x: 0,
              y: 0
            }
          }
        ).start(() => {
          if (this.state.visualState !== VisualState.Dragging) {
            this.setState({
              visualState: VisualState.Idle
            })
          }
        })
      },
      onPanResponderGrant: (e, gestureState) => {
        this.props.onDragStarted()
      },
      onPanResponderMove:
        Animated.event([
          // tslint:disable-next-line:no-null-keyword
          null as any,
          {
            dx: this.animatedPosition.x,
            dy: this.animatedPosition.y
          }
        ]),
      onPanResponderStart: (e, gestureState) => {
        this.setState({
          visualState: VisualState.Dragging
        })
      },
      onStartShouldSetPanResponder: (e, gestureState) => true
    })

    this.animatedPosition.addListener(position => {
      const boundary = Card.getBoundary(position)
      this.props.onCardDragged(boundary)
    })
  }

  private animatedPosition: Animated.ValueXY
  private panResponder: PanResponderInstance

  public render() {
    this.animatedPosition.setOffset(this.props.startPosition)

    const style = {
      position: 'absolute',
      transform: this.animatedPosition.getTranslateTransform(),
      zIndex: this.state.visualState === VisualState.Idle ? 1 : 2
    }

    // TODO: Only initialize panResponder if the card is draggable.
    const panHandlers = this.props.draggable
      ? this.panResponder.panHandlers
      : undefined

    return (
      <Animated.View
        style={style}
        {...panHandlers}
      >
        <CardView
          card={this.props.card}
          draggable={this.props.draggable}
          correctlyPlaced={this.props.correctlyPlaced}
          shadow={this.state.visualState !== VisualState.Idle}
        />
      </Animated.View>
    )
  }
}