import { FULL_TEST_01 } from "./test-01";
import { FULL_TEST_02 } from "./test-02";
import { FULL_TEST_03 } from "./test-03";
import { FULL_TEST_04 } from "./test-04";
import { FULL_TEST_05 } from "./test-05";
import { FULL_TEST_06 } from "./test-06";
import { FULL_TEST_07 } from "./test-07";
import { FULL_TEST_08 } from "./test-08";
import { FULL_TEST_09 } from "./test-09";
import { FULL_TEST_10 } from "./test-10";
import type { FullTestInput } from "./types";

/**
 * Examens blancs rediges.
 *
 * Ajouter un module ici apres avoir cree `test-NN.ts`, puis lancer
 * `npm run content:full`. Le compilateur refuse les volumes incomplets.
 */
export const FULL_TESTS: FullTestInput[] = [
  FULL_TEST_01,
  FULL_TEST_02,
  FULL_TEST_03,
  FULL_TEST_04,
  FULL_TEST_05,
  FULL_TEST_06,
  FULL_TEST_07,
  FULL_TEST_08,
  FULL_TEST_09,
  FULL_TEST_10,
];
