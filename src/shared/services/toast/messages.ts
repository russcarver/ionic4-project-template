import { startCase } from 'lodash';

export class Messages {
  public static readonly inactivityTimeoutMessage: string = 'You have been automatically logged out due to inactivity.';

  private static titleCase(text: string): string {
    return startCase(text.toLowerCase());
  }

}
