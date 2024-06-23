export interface DeleteAction {
  action: "delete";
  postId: string;
}

export interface LikeAction {
  action: "like";
  postId?: string;
  userId?: string;
}

export interface DislikeAction {
  action: "dislike";
  postId?: string;
  userId?: string;
}

export type ActionData = DeleteAction | LikeAction | DislikeAction;

export const handleVideoAction = (data: ActionData) => {
  switch (data.action) {
    case "like":
      console.log(
        `Liking video with id: ${data.postId} by user ${data.userId}`
      );
      // Add your like logic here
      break;
    case "delete":
      console.log(`Deleting video with id: ${data.postId}`);
      // Add your delete logic here
      break;
    default:
      console.log(`Unknown action: ${data}`);
  }
};
