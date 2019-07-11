import { computed } from "mobx";

import { Suit } from "./Suit";
import { SuitHelper } from "./SuitHelper";

export class Card {
  constructor(
    public readonly suit: Suit,
    public readonly value: number,
    public readonly next: Card | undefined
  ) {}

  @computed
  public get displayValue(): string {
    switch (this.value) {
      case 1:
        return "A";

      case 11:
        return "J";

      case 12:
        return "Q";

      case 13:
        return "K";

      default:
        return this.value.toString();
    }
  }

  @computed
  public get key(): string {
    const key = this.displayValue + SuitHelper.getCharacter(this.suit);
    return key;
  }
}
