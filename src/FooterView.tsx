import * as React from 'react'
import { Button } from 'react-native'
import { Component } from 'react'
import { Modal } from 'react-native'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Slider } from 'react-native'
import { Text } from 'react-native'
import { TextStyle } from 'react-native'
import { View } from 'react-native'

import { Game } from './model/Game'
import { GameState } from './model/GameState'
import { Settings } from './model/Settings'
import { TouchableIcon } from './TouchableIcon'
import { TouchableState } from './model/TouchableState'

@observer
export class FooterView extends Component {
  @observable private confirmModalVisible: boolean = false

  public render() {
    const questionStyle: TextStyle = {
      fontSize: 24,
      marginBottom: 10,
      textAlign: 'center'
    }

    return (
      <View
        style={{
          backgroundColor: Settings.instance.colors.mainBackgroundColor,
          paddingBottom: 14, // TODO: Remove the need for this value. Tweaked manually to make it fit.
          paddingTop: 4
        }}
      >
        {Game.instance.gameState === GameState.SelectLevel
          ? (
            // TODO: Put style in variable.
            <View
              style={{
                backgroundColor: Settings.instance.colors.mainBackgroundColor,
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              <View
                style={{
                  width: `${6 / 7 * 100}%`
                }}
              >
                {/* TODO: Reduce the height of the slider. */}
                <Slider
                  maximumValue={13}
                  minimumValue={5}
                  onValueChange={newValue => Settings.instance.maxCardValue = newValue}
                  step={1}
                  value={Settings.instance.maxCardValue}
                />
              </View>
              {/* TODO: Use another icon. */}
              <TouchableIcon
                handlePress={() => this.confirmUnlessGameOver()}
                iconGroup="fontAwesome"
                iconName="fast-backward"
                state={TouchableState.Enabled}
              />
            </View>
          ) : (
            <View
              style={{
                backgroundColor: Settings.instance.colors.mainBackgroundColor,
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}
            >
              <TouchableIcon
                handlePress={() => this.confirmUnlessGameOver()}
                iconGroup="fontAwesome"
                iconName="fast-backward"
                state={TouchableState.Enabled}
              />
              <TouchableIcon
                handlePress={() => Game.instance.replay()}
                iconGroup="entypo"
                iconName="controller-fast-forward"
                state={Game.instance.replayEnabled ? TouchableState.Enabled : TouchableState.Hidden}
              />
              <TouchableIcon
                handlePress={() => Game.instance.shuffleCardsInIncorrectPosition()}
                iconGroup="entypo"
                iconName="shuffle"
                state={this.shuffleButtonEnabled(1)}
              />
              <TouchableIcon
                handlePress={() => Game.instance.shuffleCardsInIncorrectPosition()}
                iconGroup="entypo"
                iconName="shuffle"
                state={this.shuffleButtonEnabled(2)}
              />
              <TouchableIcon
                handlePress={() => Game.instance.shuffleCardsInIncorrectPosition()}
                iconGroup="entypo"
                iconName="shuffle"
                state={this.shuffleButtonEnabled(3)}
              />
              <TouchableIcon
                handlePress={() => Game.instance.undo()}
                iconGroup="fontAwesome"
                iconName="step-backward"
                state={Game.instance.undoState}
              />
              <TouchableIcon
                handlePress={() => Game.instance.redo()}
                iconGroup="fontAwesome"
                iconName="step-forward"
                state={Game.instance.redoState}
              />
            </View>
          )
        }
        <Modal
          animationType="slide"
          supportedOrientations={['landscape']}
          transparent={false}
          visible={this.confirmModalVisible}
        >
          <View style={{ marginTop: 22 }}>
            <Text style={questionStyle}>
              This game isn't over yet. Start over anyway?
            </Text>
            <Button
              onPress={() => this.startOver()}
              title="Yes, start over"
            />
            <Button
              onPress={() => this.confirmModalVisible = false}
              title="No, let me continue this game"
            />
          </View>
        </Modal>
      </View>
    )
  }

  private confirmUnlessGameOver() {
    switch (Game.instance.gameState) {
      case GameState.Lost:
      case GameState.Won:
        Game.instance.startOver()
        break

      case GameState.MovePossible:
      case GameState.Stuck:
        this.confirmModalVisible = true
        break

      default:
        throw new Error(`Game state ${Game.instance.gameState} is not supported.`)
    }
  }

  private shuffleButtonEnabled(buttonNumber: number): TouchableState {
    const buttonNumberToEnable = Game.instance.shuffles + 1

    if (buttonNumber < buttonNumberToEnable) {
      return TouchableState.Hidden
    }

    if (buttonNumber === buttonNumberToEnable
      && Game.instance.gameState === GameState.Stuck) {
      return TouchableState.Enabled
    }

    return TouchableState.Disabled
  }

  private startOver() {
    this.confirmModalVisible = false
    Game.instance.startOver()
  }
}