export interface QRConfig {
  value: string;
  fgColor: string;
  bgColor: string;
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
  includeLogo: boolean;
  logoUrl: string | null;
  logoSize: number;
}

export interface ThemeResponse {
  fgColor: string;
  bgColor: string;
  reasoning?: string;
}

export enum AIStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AIState {
  status: AIStatus;
  message: string;
}