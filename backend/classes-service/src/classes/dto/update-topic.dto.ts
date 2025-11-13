export class UpdateTopicDto {
  topicId: number;
  userId: number; // з JWT (teacher)
  title: string;
}
