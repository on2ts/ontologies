import ontology from './ontology.json';
import { exportsGenerator } from '@on2ts/ontologies-utils';

const { stream, array } = exportsGenerator(ontology);

export { stream, array };
