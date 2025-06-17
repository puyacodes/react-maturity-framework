import { isFunction, isObject } from "@locustjs/base";

const events = [
  // Clipboard Events
  'Copy',
  'CopyCapture',
  'Cut',
  'CutCapture',
  'Paste',
  'PasteCapture',

  // Composition Events
  'CompositionEnd',
  'CompositionEndCapture',
  'CompositionStart',
  'CompositionStartCapture',
  'CompositionUpdate',
  'CompositionUpdateCapture',

  // Focus Events
  'Focus',
  'FocusCapture',
  'Blur',
  'BlurCapture',

  // Form Events
  'Change',
  'ChangeCapture',
  'BeforeInput',
  'BeforeInputCapture',
  'Input',
  'InputCapture',
  'Reset',
  'ResetCapture',
  'Submit',
  'SubmitCapture',
  'Invalid',
  'InvalidCapture',

  // Image Events
  'Load',
  'LoadCapture',
  'Error',
  'ErrorCapture',

  // Keyboard Events
  'KeyDown',
  'KeyDownCapture',
  'KeyPress',
  'KeyPressCapture',
  'KeyUp',
  'KeyUpCapture',

  // Media Events
  'Abort',
  'AbortCapture',
  'CanPlay',
  'CanPlayCapture',
  'CanPlayThrough',
  'CanPlayThroughCapture',
  'DurationChange',
  'DurationChangeCapture',
  'Emptied',
  'EmptiedCapture',
  'Encrypted',
  'EncryptedCapture',
  'Ended',
  'EndedCapture',
  'LoadedData',
  'LoadedDataCapture',
  'LoadedMetadata',
  'LoadedMetadataCapture',
  'LoadStart',
  'LoadStartCapture',
  'Pause',
  'PauseCapture',
  'Play',
  'PlayCapture',
  'Playing',
  'PlayingCapture',
  'Progress',
  'ProgressCapture',
  'RateChange',
  'RateChangeCapture',
  'Resize',
  'ResizeCapture',
  'Seeked',
  'SeekedCapture',
  'Seeking',
  'SeekingCapture',
  'Stalled',
  'StalledCapture',
  'Suspend',
  'SuspendCapture',
  'TimeUpdate',
  'TimeUpdateCapture',
  'VolumeChange',
  'VolumeChangeCapture',
  'Waiting',
  'WaitingCapture',

  // MouseEvents
  'AuxClick',
  'AuxClickCapture',
  'Click',
  'ClickCapture',
  'ContextMenu',
  'ContextMenuCapture',
  'DoubleClick',
  'DoubleClickCapture',
  'Drag',
  'DragCapture',
  'DragEnd',
  'DragEndCapture',
  'DragEnter',
  'DragEnterCapture',
  'DragExit',
  'DragExitCapture',
  'DragLeave',
  'DragLeaveCapture',
  'DragOver',
  'DragOverCapture',
  'DragStart',
  'DragStartCapture',
  'Drop',
  'DropCapture',
  'MouseDown',
  'MouseDownCapture',
  'MouseEnter',
  'MouseLeave',
  'MouseMove',
  'MouseMoveCapture',
  'MouseOut',
  'MouseOutCapture',
  'MouseOver',
  'MouseOverCapture',
  'MouseUp',
  'MouseUpCapture',

  // Selection Events
  'Select',
  'SelectCapture',

  // Touch Events
  'TouchCancel',
  'TouchCancelCapture',
  'TouchEnd',
  'TouchEndCapture',
  'TouchMove',
  'TouchMoveCapture',
  'TouchStart',
  'TouchStartCapture',

  // Pointer Events
  'PointerDown',
  'PointerDownCapture',
  'PointerMove',
  'PointerMoveCapture',
  'PointerUp',
  'PointerUpCapture',
  'PointerCancel',
  'PointerCancelCapture',
  'PointerEnter',
  'PointerLeave',
  'PointerOver',
  'PointerOverCapture',
  'PointerOut',
  'PointerOutCapture',
  'GotPointerCapture',
  'GotPointerCaptureCapture',
  'LostPointerCapture',
  'LostPointerCaptureCapture',

  // UI Events
  'Scroll',
  'ScrollCapture',

  // Wheel Events
  'Wheel',
  'WheelCapture',

  // Animation Events
  'AnimationStart',
  'AnimationStartCapture',
  'AnimationEnd',
  'AnimationEndCapture',
  'AnimationIteration',
  'AnimationIterationCapture',

  // Transition Events
  'TransitionEnd',
  'TransitionEndCapture',
]

const getEventHandlers = (props, handle) => {
  const result = {}

  if (isObject(props)) {
    for (let event of events) {
      const key = `on${event}`;
      const handler = props[key];

      if (isFunction(handler)) {
        result[key] = handle(handler)
      }
    }
  }

  return result;
};

export default getEventHandlers;
