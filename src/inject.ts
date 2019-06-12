export enum MessageTypes {
  REQUEST_LOCATION,
  SEND_LOCATION,
}

export interface IMessage<T> {
  type: MessageTypes;
  payload?: T;
}

chrome.runtime.onMessage.addListener((message: IMessage<any>, _, sendResponse) => {
  switch (message.type) {
    case MessageTypes.REQUEST_LOCATION: {
      const message: IMessage<Location> = {
        type: MessageTypes.SEND_LOCATION,
        payload: window.location,
      };
      sendResponse(message);
      return;
    }
    default: {
      return;
    }
  }
});