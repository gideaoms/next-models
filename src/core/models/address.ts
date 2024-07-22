export declare module Address {
  type Props = {
    street: string;
    city: string;
  }
}

export class Address {
  static empty = Address.build({})

  private constructor(
    readonly street: string,
    readonly city: string,
  ) { }

  static build(props: Partial<Address.Props>) {
    return new Address(
      props.street ?? '',
      props.city ?? '',
    )
  }
}