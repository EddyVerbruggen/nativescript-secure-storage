/**
 * iOS and Android apis should match.
 * It doesn't matter if you export `.ios` or `.android`, either one but only one.
 */
export * from './secure-storage.ios';

// Export any shared classes, constants, etc.
export * from './secure-storage.common';