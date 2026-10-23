import { FULL_TEST_01 } from "./test-01";
import { FULL_TEST_02 } from "./test-02";
import { FULL_TEST_03 } from "./test-03";
import { FULL_TEST_04 } from "./test-04";
import { FULL_TEST_05 } from "./test-05";
import type { FullTestInput } from "./types";

/**
 * Examens blancs rediges.
 *
 * Ajouter un module ici apres avoir cree `test-NN.ts`, puis lancer
 * `npm run content:full`. Le compilateur refuse les volumes incomplets.
 */
export const FULL_TESTS: FullTestInput[] = [FULL_TEST_01, FULL_TEST_02, FULL_TEST_03, FULL_TEST_04, FULL_TEST_05];
