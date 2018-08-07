import { computed } from 'mobx'

import { Card } from './Card'
import { CardCellPair } from './CardCellPair'
import { Cell } from './Cell'
import { EmptyCell } from './EmptyCell'
import { Game } from './Game'
import { GridCell } from './GridCell'
import { GridState } from './GridState'
import { Point } from './Point'

export class PositionedCard extends GridCell implements CardCellPair {
  constructor(
    cell: Cell,
    gridState: GridState,
    public card: Card
  ) {
    super(cell, gridState)
  }

  @computed
  public get correctlyPlaced(): boolean {
    if (this.cell.cellToTheLeft === undefined) {
      const aceInFirstColumn = this.card.value === 1
      return aceInFirstColumn
    }

    if (this.left === undefined) {
      return false
    }

    if (this.left instanceof EmptyCell) {
      return false
    }

    const followsCardToTheLeft = this.left.correctlyPlaced && this.left.card.next === this.card
    return followsCardToTheLeft
  }

  @computed
  public get draggable(): boolean {
    const draggable = Game.instance.currentGridState.draggableCards.some(card => card === this.card)
    return draggable
  }

  /** Moves the card to the first availble target. This is only called on cards that are draggable. Returns the vector used for the animating the move. */
  public moveToTarget(): Point {
    return Game.instance.moveCardToTarget(this)
  }
}