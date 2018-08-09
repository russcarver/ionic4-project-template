export class Message {
  public static readonly messageTypeError: string = 'ERROR';
  public static readonly messageTypeInfo: string = 'INFO';
  public static readonly messageTypeWarn: string = 'WARN';

  public field: string;
  public id: string;
  public message: string;
  public type: string;
}
