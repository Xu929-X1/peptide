import { AdapterResponse } from "../adapters/type.ts";
import { PeptideInput } from "../core/type.ts";

export interface PeptideHooks {
    beforeCall?: (input: PeptideInput) => void | Promise<void>,
    afterCall?: (input: PeptideInput, output: AdapterResponse) => void | Promise<void>,
}
