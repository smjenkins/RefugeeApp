import * as React from 'react';
import { ActionSheetIOSOptions } from '../types';
interface Props {
    readonly children: React.ReactNode;
}
declare type onSelect = (buttonIndex: number) => void;
export default class ActionSheet extends React.Component<Props> {
    render(): JSX.Element;
    showActionSheetWithOptions(options: ActionSheetIOSOptions, onSelect: onSelect): void;
}
export {};
