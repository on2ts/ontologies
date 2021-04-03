import { streamFactory, arrayFactory, exportsGenerator } from '../lib';
import ontology from './ontology.json';

describe('Testing stream', () => {
  it('Should be able to read stream items', async () => {
    const array = await arrayFactory(streamFactory(ontology))();
    expect(array).toBeInstanceOf(Array);
    expect(array.length).toBeGreaterThan(1);
  });

  it('Should be able to read stream items', async () => {
    const array = await exportsGenerator(ontology).array();
    expect(array).toBeInstanceOf(Array);
    expect(array.length).toBeGreaterThan(1);
  });

  // TODO: [FUTURE] - Handle invalid ontologies, should pass
  // this test case
  // it('Should error on invalid ontologies', async () => {
  //   const array = arrayFactory(streamFactory({ a: '[ontology]' }))();
  //   expect(array).rejects.toEqual('undefined')
  // })
});
