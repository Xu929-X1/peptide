import { AdapterResponse } from "../adapters/type";
import { PeptideInput } from "../core/type";

export interface PeptideHooks {
    beforeCall?: (input: PeptideInput) => void | Promise<void>,
    afterCall?: (input: PeptideInput, output: AdapterResponse) => void | Promise<void>,
}
