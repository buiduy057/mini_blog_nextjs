import PostCard from "../../components/PostCard";
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 }, // SSG + ISR
  });
  return res.json();
}
export default async function Post() {
  const posts = await getPosts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.slice(0, 10).map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
