import context from '../lib';

describe('Should expose the context as an object', () => {
  it('Should be an object', () => {
    expect(context).toBeInstanceOf(Object);
  });

  it('Should have sh defined', () => {
    expect(context['@context'].sh).toEqual('http://www.w3.org/ns/shacl#');
  });
});
