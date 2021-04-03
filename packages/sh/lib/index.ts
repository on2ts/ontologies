import type { JsonLdParser } from 'jsonld-streaming-parser';
import type { Quad } from 'rdf-js';
import { exportsGenerator } from '@on2ts/ontologies-utils';
import ontology from './ontology.json';

const { stream, array }: {
  stream: () => JsonLdParser,
  array: () => Promise<Quad[]>,
} = exportsGenerator(ontology);

export { stream, array };
