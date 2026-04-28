import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { getBlogPostBySlug } from "@/lib/blog";

const post = getBlogPostBySlug("saas-landing-page-google-meta-ads");

const BlogSaasLandingPageAds = () => {
  if (!post) return null;

  return <BlogPostLayout post={post} />;
};

export default BlogSaasLandingPageAds;
