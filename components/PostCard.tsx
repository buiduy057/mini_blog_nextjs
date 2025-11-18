import Link from "next/link";

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="p-4 border rounded card">
      <h2 className="font-bold mb-2">{post.title}</h2>
      <p>{post.body.substring(0, 50)}...</p>
      <Link
        href={`/posts/${post.id}`}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        Read More
      </Link>
    </div>
  );
}
