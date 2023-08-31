type Listener = (data?: any) => void;
type EventListenerMap = { [key: string]: Listener[] };

class EventBus {
  private listeners: EventListenerMap;

  constructor() {
    this.listeners = {};
  }

  on(event: string, listener: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  remove(event: string, listener: Listener): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (l) => l !== listener
      );
    }
  }

  emit(event: string, data?: any): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(data));
    }
  }
}

// create a single instance of EventBus
export const eventBus = new EventBus();
