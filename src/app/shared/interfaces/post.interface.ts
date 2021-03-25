export interface PostI {
  id: number;
  title: string;
  description: string;
  userId: number;
  comments?: number[]; // array of commentId
  likes?: number[]; // array of userId
}
