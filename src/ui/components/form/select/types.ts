
export interface IFormSelectorProps<V> {
    selected: V|null;
    options: readonly V[];
    onChange(selected: V): void;
    extractKey?(value: V): string;
    extractLabel?(value: V): string;

}

export interface IFormSelectorOptions<V> {
    value: V;
    label: string;
    key: string;
}

export interface IFormSelectorParsedProps<V> {
    selected: V|null;
    options: readonly IFormSelectorOptions<V>[];
    onChange(selected: IFormSelectorOptions<V>): void;
}

export type IFormSelectorComponent = {
    <V>(props: IFormSelectorProps<V>): React.ReactNode;
    defaultProps?: IFormSelectorProps<unknown>
}