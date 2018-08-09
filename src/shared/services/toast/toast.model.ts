type ToastMessageType = 'error' | 'info' | 'success' | 'warn';

export class ToastMessage {
  public text: string;
  public type: ToastMessageType;
}
