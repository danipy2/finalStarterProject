import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import fetch from "cross-fetch";

// Polyfills
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
(global as any).fetch = fetch;
