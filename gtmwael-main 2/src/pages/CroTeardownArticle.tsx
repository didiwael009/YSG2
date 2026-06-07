import { useParams } from "react-router-dom";
import TeardownLayout from "@/components/cro-teardown/TeardownLayout";
import { getCroTeardownBySlug } from "@/lib/cro-teardown";

const CroTeardownArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getCroTeardownBySlug(slug) : undefined;

  // Title / meta / JSON-LD handled globally by SeoManager via getSeoRoute.

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070711] text-white">
        <p className="text-[#9990a8]">Teardown not found.</p>
      </div>
    );
  }

  return <TeardownLayout post={post} />;
};

export default CroTeardownArticle;
