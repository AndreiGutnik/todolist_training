export type ModelId = string;

type HideModelCallbackFunc = () => void;
type GetModalCallbackFunc = (closeModal: HideModelCallbackFunc) => React.ReactNode;

export type HideModelFunc = (modelId: ModelId) => void;
export type OpenModalFunc = (getModelContent: GetModalCallbackFunc) => void;
