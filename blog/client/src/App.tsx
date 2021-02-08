import React from "react";
import PostCreate from "./PostCreate";
import { QueryClient, QueryClientProvider } from "react-query";
import PostList from "./PostList";
import CommentList from "./CommentList";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
