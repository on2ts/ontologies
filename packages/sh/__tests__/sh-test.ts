import { Store } from 'n3';
import { array, stream } from '../lib';

describe('Testing array output', () => {
  it('Should return an array of all quads in the ontology', async () => {
    expect((await array()).length).toEqual(1128);
  });
});

describe('Testing stream output', () => {
  it('Should produce a paused stream of all quads in the ontology', async () => {
    const quadStream = stream();
    const store = new Store();
    await new Promise((res, rej) => {
      store.import(quadStream).on('end', () => {
        expect(store.size).toEqual(1128);
        res(undefined);
      }).on('error', (e) => {
        rej(e);
      });
      quadStream.resume();
    });

    expect.hasAssertions();
  });
});
