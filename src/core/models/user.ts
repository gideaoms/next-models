export declare module Owner {
  type Props = {
    id: number;
    name: string;
  }
}

export class Owner {
  static empty = Owner.build({})

  private constructor(
    readonly id: number,
    readonly name: string,
  ) { }

  static build(props: Partial<Owner.Props>) {
    return new Owner(
      props.id ?? 0,
      props.name ?? '',
    )
  }
}