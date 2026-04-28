import { Navigate, useParams } from "react-router-dom";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { getBlogPostBySlug } from "@/lib/blog";

const BlogArticle = () => {
  const { slug } = useParams();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  return <BlogPostLayout post={post} />;
};

export default BlogArticle;
