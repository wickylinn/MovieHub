import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const toEmbed = (url) => {
  if (!url) return "";
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (u.pathname.includes("/embed/")) return url;
    }

    return url;
  } catch {
    return url;
  }
};

const normalizeGenres = (movie) => {
  const raw = movie?.genre ?? movie?.genres ?? null;
  if (!raw) return [];

  if (Array.isArray(raw)) return raw.filter(Boolean).map(String);

  if (typeof raw === "string") {
    const s = raw.trim();
    if (!s) return [];
    if (s.startsWith("[") && s.endsWith("]")) {
      try {
        const arr = JSON.parse(s);
        if (Array.isArray(arr)) return arr.filter(Boolean).map(String);
      } catch {}
    }
    return [s];
  }

  if (typeof raw === "object") {
    return Object.values(raw).filter(Boolean).map(String);
  }

  return [];
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    API.get(`/movies/${id}`).then((res) => setMovie(res.data));
  }, [id]);

  const genres = useMemo(() => normalizeGenres(movie), [movie]);
  const trailerSrc = useMemo(() => toEmbed(movie?.trailerUrl), [movie]);

  if (!movie) {
    return (
      <div className="glass" style={{ padding: 18, borderRadius: 22 }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="movieDetails" style={{ padding: 16, borderRadius: 22 }}>
        <div className="detailsGrid">

          {/* POSTER */}
          <div>
            <div className="detailsPoster">
              <img
                src={movie.posterUrl || "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.title || "Movie"}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
            </div>
          </div>

          {/* INFO */}
          <div>
            <h1 style={{ margin: 0 }}>{movie.title || "No Title"}</h1>

            <p className="p" style={{ marginTop: 10 }}>
              {movie.description || "No Description"}
            </p>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {genres.length ? (
                genres.map((g) => (
                  <span className="badge" key={g}>🎭 {g}</span>
                ))
              ) : (
                <span className="badge">🎭 N/A</span>
              )}

              <span className="badge">
                📅 {movie.releaseDate
                  ? new Date(movie.releaseDate).toLocaleDateString()
                  : "N/A"}
              </span>

              <span className="badge">
                ⏱ {movie.duration || "N/A"} min
              </span>
            </div>

            {/* TRAILER */}
            {trailerSrc && (
              <div className="detailsPoster detailsTrailer">
                <div className="trailerWrap">
                  <iframe
                    src={trailerSrc}
                    title={movie.title || "Movie"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <ReviewForm
        movieId={id}
        onCreated={() => setRefreshKey((x) => x + 1)}
      />
      <ReviewList movieId={id} refreshKey={refreshKey} />
    </div>
  );
};

export default MovieDetails;
