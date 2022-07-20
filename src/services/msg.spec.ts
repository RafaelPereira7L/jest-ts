import { Msg } from './msg';

const createSut = () => {
  return new Msg();
};

describe('Message', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    const sut = createSut();
    expect(sut.sendMessage('test')).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('test');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
  it('should call console.log once with "Msg has been sent -> , message"', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('test');
    expect(consoleSpy).toHaveBeenCalledWith('Msg has been sent -> ', 'test');
  });
});
