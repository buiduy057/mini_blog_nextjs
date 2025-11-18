import LikeButton from "../../../components/LikeButton";

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const post = await getPost(id);
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.body}</p>
      <LikeButton />
    </div>
  );
}
