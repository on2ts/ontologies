import { JsonLdParser } from 'jsonld-streaming-parser';
import { Quad } from 'rdf-js';
import ontology from './ontology.json';

export function stream() {
  const parserJsonld = new JsonLdParser();
  parserJsonld.pause();
  parserJsonld.write(JSON.stringify(ontology));
  parserJsonld.end();
  return parserJsonld;
}

export function array(): Promise<Quad[]> {
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
}
