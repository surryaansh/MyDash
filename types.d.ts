// types.d.ts

// Add View Transition API to the global Document interface for TypeScript.
// This API is still experimental and not yet in the standard TS library.
declare global {
  interface Document {
    startViewTransition?(callback: () => void): ViewTransition;
  }

  interface ViewTransition {
    ready: Promise<void>;
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
  }
}

// This export is needed to make the file a module and allow global augmentation.
export {};
