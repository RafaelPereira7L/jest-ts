import { MsgProtocol } from '../classes/interfaces/msg-protocol';

export class Msg implements MsgProtocol {
  sendMessage(message: string): void {
    console.log('Msg has been sent -> ', message);
  }
}
