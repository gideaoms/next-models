export module Address {
  export type T = {
    street: string;
    city: string;
  }

  export const empty = build({})

  export function build(props: Partial<Address.T>) {
    const address = {
      street: props.street ?? '',
      city: props.city ?? '',
    }
    return address;
  }
}