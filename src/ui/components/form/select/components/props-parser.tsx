import React, { useMemo, useCallback } from 'react';
import { IFormSelectorParsedProps as IParsedProps, IFormSelectorOptions as IOption, IFormSelectorComponent as FC } from '../types.js';

type Extractor<V> = (value: V) => string;

const extractWithAnyOf = (...extractors: Array<undefined|Extractor<any>>) => {
    const extractor = extractors.find(Boolean);
    if(!extractor) return (value: any): string => String(value)
    return extractor
}

export const withPropsParser = (Component: React.FC<IParsedProps<any>>) => {
    const FormSelectorContainer: FC = (props) => {
        const extract = {
            key: useCallback(extractWithAnyOf(props.extractKey, props.extractLabel), [props.extractKey || props.extractLabel]),
            label: useCallback(extractWithAnyOf(props.extractLabel, props.extractKey), [props.extractKey || props.extractLabel]),
        }

        const options = useMemo((): IOption<any>[] => {
            return props.options.map((value): IOption<any> => {
                return {
                    value,
                    key: extract.key(value),
                    label: extract.label(value)

                }
            })
        }, [props.options, extract.key, extract.label])

        return <Component
            onChange={useCallback((option) => {
                props.onChange(option.value)
            }, [props.onChange])}
            options={options}
            selected={props.selected}
        />

    }

    return FormSelectorContainer
}