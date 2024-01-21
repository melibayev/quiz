export const TOKEN = "token";
export const API = "https://swiftlinkapi.azurewebsites.net/";
export const ENDPOINT = API + "api/";

export interface Question {
  id: number;
  text: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
  numberOfQuestions: number;
}
export interface CardProps {
  id: number;
  text: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
  numberOfQuestions: number;
}

export interface User {
  id: number;
  solvedAt: string;
  testVariantId: number;
  testVariantName: string;
  totalScore: number;
  userId: number;
  username: string;
}

export interface DataType {
  id: React.Key;
  username: string;
  totalScore: number;
  solvedAt: any;
}