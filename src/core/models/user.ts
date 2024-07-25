import { Address } from "@/core/models/address";

export module Owner {
  export type T = {
    id: string;
    name: string;
    address?: Address.T;
  }

  export const empty = build({})

  export function build(props: Partial<T>) {
    const owner: T = {
      id: props.id ?? '',
      name: props.name ?? '',
      address: props.address,
    }
    return owner
  }
}