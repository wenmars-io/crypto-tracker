import { holdingSchem } from "./schemas/holding";
import { Holding } from "./types";

export class HoldingEntity {
  public constructor(public readonly props: Holding) {
    holdingSchem.parse(props);
  }
}
