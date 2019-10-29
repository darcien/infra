import { DateTimePickerProps as RNDateTimePickerProps } from 'react-native-modal-datetime-picker';

export type DateTimePickerMode = 'date' | 'time' | 'datetime';

export type DateTimePickerProps = Readonly<
  Omit<RNDateTimePickerProps, 'onCancel' | 'onConfirm' | 'date' | 'mode'> & {
    mode?: DateTimePickerMode;
    date?: string;
    onCancel: () => void;
    onConfirm: (date: string) => void;
  }
>;
