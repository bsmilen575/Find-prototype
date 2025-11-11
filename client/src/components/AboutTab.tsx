export function AboutTab() {
  return (
    <div className="h-full w-full overflow-y-auto px-4 md:px-8 py-6" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-8">About</h1>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">The Problem</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              Most social platforms today are optimized for engagement, not growth. They are engineered with good intentions, but they ultimately keep people on screens instead of in the physical world.
            </p>
            <p>
              But, there is enough data to invert the paradigm so that networks serve their users, not the other way around. Enter Find.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction to Find</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              Find is the first private, self-building personal interest graph.
            </p>
            <p>
              It learns what you care about — books, ideas, questions, random rabbit-holes — and turns that awareness into real-life serendipity.
            </p>
            <p>
              Find helps you map your patterns, surface latent connections with people around you, and make chance discoveries that were not visible before.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Privacy Architecture</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              Your data lives inside your personal pod, built on the SOLID protocol by Tim Berners-Lee. It is encrypted and is owned by you, always.
            </p>
            <p>
              Nothing leaves a pod unless you explicitly choose to share it.
            </p>
            <p>
              When Find surfaces a nearby connection, it does so through mutual consent and on-device matching, never through public feeds or ad networks.
            </p>
            <p>
              You control what's visible, when, and to whom.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Use It</h2>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              Keep a quiet dialogue with Find.
            </p>
            <p>
              Upload what's inspiring or confusing you (articles, notes, playlists, places).
            </p>
            <p>
              Tag or describe what's pulling your attention this week.
            </p>
            <p>
              Let it observe patterns, build your interest graph, and suggest both reflections and people whose paths align.
            </p>
            <p className="font-medium">
              The more context you share, the more Find can return something rare.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
