import { TrendingUp, Plus, BookOpen, Video, FileText, Mic, Calendar, Dog, Users, Music, Leaf, Laugh } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import findLogo from '@assets/Find_logo-removebg-preview_1762715955146.png';

export function InsightsTab() {
  return (
    <div className="h-full w-full overflow-y-auto px-4 md:px-8 py-6" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Your Attention Map</h1>
          <p className="text-sm text-gray-600">
            Topics you're engaging with most right now.
          </p>
        </div>

        {/* Attention Clusters */}
        <div className="space-y-4">
          <AttentionCluster
            title="Healthy Habits & Nutrition"
            color="#9C8ADE"
          />
          
          <AttentionCluster
            title="Sports, Music & Live Experiences"
            color="#74A8E4"
          />
          
          <AttentionCluster
            title="Home & Personal Wellness"
            color="#E7A26F"
          />
          
          <AttentionCluster
            title="Food Culture & Entertainment"
            color="#8CCB9B"
          />
          
          <AttentionCluster
            title="Travel & New Experiences"
            color="#F5C06E"
          />
        </div>

        {/* Things You Might Like */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Things You Might Like Exploring</h2>
          <p className="text-sm text-gray-600 mb-4">
            Curated from latent-space neighbors two hops away from your graph
          </p>
          
          <div className="space-y-3">
            <Suggestion
              icon={<BookOpen className="w-4 h-4" />}
              title='"The Left Hand of Darkness" — Ursula K. Le Guin'
              reason="Because you like Succession and Indie Music"
              tags={["Book", "Speculative Fiction"]}
            />
            
            <Suggestion
              icon={<Video className="w-4 h-4" />}
              title='"Architectural Digest – Small Spaces Series"'
              reason="Because you're interested in sustainable decor"
              tags={["Video Series", "Design"]}
            />
            
            <Suggestion
              icon={<FileText className="w-4 h-4" />}
              title='"AI and the Aesthetics of Taste" by K. Crawford'
              reason="Because you recently read about art curation and AI"
              tags={["Essay", "AI Ethics"]}
            />
            
            <Suggestion
              icon={<Mic className="w-4 h-4" />}
              title={`"Mindful Strength" Podcast Ep. 214 — 'Rest as Resistance'`}
              reason="Because you are starting up a new fitness regimen and have had difficulties with recovery"
              tags={["Podcast", "Wellness"]}
            />
            
            <Suggestion
              icon={<Calendar className="w-4 h-4" />}
              title="Local Workshop: Intro to Analog Photography"
              reason="Because you have a growing vinyl collection"
              tags={["Event", "Hands-On Craft"]}
            />
          </div>
        </div>

        {/* Insights on Your Neighborhood */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Insights on Your Neighborhood</h2>
          <p className="text-sm text-gray-600 mb-4">
            Top aggregated interests from nearby Pulse data (within 3 km), merged with your clusters
          </p>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Change</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Relation</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <TrendRow
                  rank={1}
                  trend="Dog Parks & Adopt-a-Pet Events"
                  icon={<Dog className="w-4 h-4" />}
                  change="+14%"
                  changeType="up"
                  relation="New trend among your neighbors"
                />
                <TrendRow
                  rank={2}
                  trend="Local Run Clubs"
                  icon={<Users className="w-4 h-4" />}
                  change="+11%"
                  changeType="up"
                  relation="Popular with people who also like fitness"
                />
                <TrendRow
                  rank={3}
                  trend="Pop-Up Vinyl Fair @ Mission Yards"
                  icon={<Music className="w-4 h-4" />}
                  change="+9%"
                  changeType="up"
                  relation="Related to your music interests"
                />
                <TrendRow
                  rank={4}
                  trend="Sustainable Home Markets"
                  icon={<Leaf className="w-4 h-4" />}
                  change="+7%"
                  changeType="up"
                  relation="Related to your lifestyle interests"
                />
                <TrendRow
                  rank={5}
                  trend="Comedy Open Mic Nights"
                  icon={<Laugh className="w-4 h-4" />}
                  change="+5%"
                  changeType="up"
                  relation="New discovery for you"
                />
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            (Tap "Add" to turn a trend into a ghost node and connect it to your graph.)
          </p>
        </div>

        {/* Magic Section */}
        <div className="mt-12 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 p-6">
            <div className="flex items-start gap-3">
              <img src={findLogo} alt="Find" className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Magic</h3>
                <p className="text-sm text-gray-700 mb-2">
                  You and <strong>1,842</strong> other people worldwide recently read "The Myth of Sisyphus."
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Shared live themes: <span className="font-medium">Absurdism · Persistence · Agency under Constraint</span>
                </p>
                <p className="text-xs text-gray-500">
                  — <strong>6 others</strong> within 1 km read it this week.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

interface AttentionClusterProps {
  title: string;
  color: string;
}

function AttentionCluster({ title, color }: AttentionClusterProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4" data-testid={`attention-cluster-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start gap-3">
        <div 
          className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" 
          style={{ backgroundColor: color }}
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
    </div>
  );
}

interface SuggestionProps {
  icon: React.ReactNode;
  title: string;
  reason: string;
  tags: string[];
}

function Suggestion({ icon, title, reason, tags }: SuggestionProps) {
  const testId = `suggestion-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover-elevate" data-testid={testId}>
      <div className="flex items-start gap-3">
        <div className="text-gray-500 mt-0.5">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600 mb-2">{reason}</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TrendRowProps {
  rank: number;
  trend: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'up' | 'down';
  relation: string;
}

function TrendRow({ rank, trend, icon, change, changeType, relation }: TrendRowProps) {
  return (
    <tr className="hover-elevate" data-testid={`trend-row-${rank}`}>
      <td className="py-3 px-4 font-medium text-gray-900">{rank}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="text-gray-500">
            {icon}
          </div>
          <span className="text-gray-900">{trend}</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center gap-1 text-sm font-medium ${changeType === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
          <TrendingUp className={`w-3 h-3 ${changeType === 'down' && 'rotate-180'}`} />
          {change}
        </span>
      </td>
      <td className="py-3 px-4 text-gray-600">{relation}</td>
      <td className="py-3 px-4 text-right">
        <Button 
          size="sm" 
          variant="outline" 
          className="gap-1.5"
          data-testid={`button-add-trend-${rank}`}
        >
          <Plus className="w-3 h-3" />
          Add
        </Button>
      </td>
    </tr>
  );
}
