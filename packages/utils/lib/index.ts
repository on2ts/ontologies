import { JsonLdParser } from 'jsonld-streaming-parser';
import type { Quad } from 'rdf-js';

export function streamFactory(ontology: Object) {
  return function stream(): JsonLdParser {
    const parserJsonld = new JsonLdParser();
    parserJsonld.pause();
    parserJsonld.write(JSON.stringify(ontology));
    parserJsonld.end();
    return parserJsonld;
  };
}

export function arrayFactory(stream: () => JsonLdParser) {
  return function array(): Promise<Quad[]> {
    return new Promise((resolve, reject) => {
      const arr: Quad[] = [];
      const quadStream = stream();
      quadStream.on('data', (data) => {
        arr.push(data);
      });
      quadStream.on('end', () => {
        resolve(arr);
      });
      quadStream.on('err', (e) => {
        reject(e);
      });
      quadStream.resume();
    });
  };
}

export function exportsGenerator(ontology: Object) {
  const stream = streamFactory(ontology);
  return {
    stream,
    array: arrayFactory(stream),
  };
}
