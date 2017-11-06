// @flow

import {observe, send} from "@jumpn/absinthe-phoenix-socket";

import type {AbsintheSocket} from "@jumpn/absinthe-phoenix-socket/compat/cjs/types";
import type {FetchFunction} from "react-relay";

/**
 * Creates a Fetcher (Relay FetchFunction) using the given AbsintheSocket
 * instance
 */
const createFetcher = (
  absintheSocket: AbsintheSocket,
  onError?: (error: Error) => any
): FetchFunction => ({text: operation}, variables) =>
  new Promise((resolve, reject) =>
    // $FlowFixMe: operation is always defined
    observe(absintheSocket, send(absintheSocket, {operation, variables}), {
      onError,
      onAbort: reject,
      onValue: resolve
    })
  );

export default createFetcher;
