import { computed } from "mobx"

import { Card } from "./Card"
import { Cell } from "./Cell"
import { Deck } from "./Deck"
import { GridCell } from "./GridCell"
import { GridState } from "./GridState"

export class EmptyCell extends GridCell {
  constructor(cell: Cell, gridState: GridState) {
    super(cell, gridState)
  }

  @computed
  public get droppableCards(): ReadonlyArray<Card> {
    if (this.left === undefined) {
      return Deck.instance.theFourAces
    }

    if (this.left instanceof EmptyCell) {
      return []
    }

    if (this.left.card.next === undefined) {
      return []
    }

    return [this.left.card.next]
  }
}
