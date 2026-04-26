import { Play, Eye, TrendingUp, Sparkles } from "lucide-react";

export interface VideoProject {
  title: string;
  platform: string;
  metric: string;
  metricLabel: string;
  description: string;
  isVertical: boolean;
  link: string;
  cover: string;
}

const VideoGrid = ({ projects }: { projects: VideoProject[] }) => {
  const [vertical, horizontal1, horizontal2] = projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
      {/* Vertical card */}
      <a href={vertical.link} target="_blank" rel="noopener noreferrer" className="md:col-span-4 group cursor-pointer">
        <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
          <img src={vertical.cover} alt={vertical.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <span className="inline-block w-fit px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-semibold text-foreground">
              {vertical.platform}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-accent" />
                <span className="text-4xl font-display font-bold text-white">{vertical.metric}</span>
              </div>
              <p className="text-sm text-white/70 mb-2">{vertical.metricLabel}</p>
              <h3 className="text-xl font-semibold text-white mb-2">{vertical.title}</h3>
              <p className="text-sm text-white/70">{vertical.description}</p>
            </div>
          </div>
          <PlayOverlay className="bg-primary" />
        </div>
      </a>

      {/* Horizontal stack */}
      <div className="md:col-span-8 flex flex-col gap-6 lg:gap-8">
        <HorizontalVideoCard project={horizontal1} icon={<TrendingUp className="w-5 h-5 text-accent" />} badgeClass="bg-destructive text-destructive-foreground" />
        <HorizontalVideoCard project={horizontal2} icon={<Sparkles className="w-5 h-5 text-accent" />} badgeClass="bg-accent text-accent-foreground" metricClass="text-accent" />
      </div>
    </div>
  );
};

function HorizontalVideoCard({
  project,
  icon,
  badgeClass,
  metricClass = "text-white",
}: {
  project: VideoProject;
  icon: React.ReactNode;
  badgeClass: string;
  metricClass?: string;
}) {
  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="group flex-1 cursor-pointer block">
      <div className="relative h-full min-h-[280px] rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
        <img src={project.cover} alt={project.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${badgeClass}`}>
              {project.platform}
            </span>
            <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-3">{project.title}</h3>
            <p className="text-white/80">{project.description}</p>
          </div>
          <div className="flex items-center gap-4 md:text-right">
            <div>
              <div className="flex items-center gap-2 justify-start md:justify-end">
                {icon}
                <span className={`text-4xl lg:text-5xl font-display font-bold ${metricClass}`}>{project.metric}</span>
              </div>
              <p className="text-sm text-white/70">{project.metricLabel}</p>
            </div>
          </div>
        </div>
        <PlayOverlay className="bg-accent" />
      </div>
    </a>
  );
}

function PlayOverlay({ className }: { className: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${className} flex items-center justify-center shadow-xl`}>
        <Play className="w-7 h-7 md:w-9 md:h-9 text-white fill-current ml-1" />
      </div>
    </div>
  );
}

export default VideoGrid;
