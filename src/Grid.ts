import { computed } from 'mobx'
import { observable } from 'mobx'

import { CardModel } from './CardModel'
import { Cell } from './Cell'
import { Rectangle } from './Rectangle'
import { Size } from './Size'
import { Suit } from './Suit'

export class Grid {
  constructor() {
    for (const suit of [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades]) {
      if (Suit.hasOwnProperty(suit)) {
        for (let i = 1; i <= 13; i++) {
          const card = new CardModel(suit, i)
          this.deck.push(card)
        }
      }
    }

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let cell: Cell
        const position = {
          left: this.spaceBetweenCells + c * (this.cellSize.width + this.spaceBetweenCells),
          top: this.spaceBetweenCells + r * (this.cellSize.height + this.spaceBetweenCells)
        }

        if (c === 0) {
          cell = new Cell(r, c, position, this.cellSize, undefined)
        }
        else {
          const cellToTheLeft = this.cells[this.cells.length - 1]
          cell = new Cell(r, c, position, this.cellSize, cellToTheLeft)
          cell.card = this.deck[(this.columns - 1) * r + (c - 1)]
        }
        this.cells.push(cell)
      }
    }
  }

  private spaceBetweenCells = 5
  @observable public readonly cells: Array<Cell> = []
  @observable public availableHeight: number | undefined = undefined
  @observable public availableWidth: number | undefined = undefined

  private readonly columns = 14
  private readonly deck: Array<CardModel> = []
  private readonly rows = 4

  @computed public get cellSize(): Size {
    return {
      height: 60,
      width: 40
    }
  }

  @computed
  public get emptyCells(): Array<Cell> {
    const emptyCells = this.cells.filter(cell => cell.isEmpty)
    return emptyCells
  }

  public getCellBundary(cell: Cell): Rectangle {
    const boundary = new Rectangle(
      {
        left: cell.position.left,
        top: cell.position.top
      },
      {
        left: cell.position.left + this.cellSize.width,
        top: cell.position.top + this.cellSize.height
      }
    )

    return boundary
  }

  public moveCard(from: Cell, to: Cell) {
    to.card = from.card
    from.card = undefined
  }
}