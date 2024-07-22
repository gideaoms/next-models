import { Address } from "@/core/models/address";

export declare module Owner {
  type Props = {
    id: number;
    name: string;
    address?: Address;
  }
}

export class Owner {
  static empty = Owner.build({})

  private constructor(
    readonly id: number,
    readonly name: string,
    readonly address: Address | undefined,
  ) { }

  static build(props: Partial<Owner.Props>) {
    return new Owner(
      props.id ?? 0,
      props.name ?? '',
      props.address,
    )
  }
}