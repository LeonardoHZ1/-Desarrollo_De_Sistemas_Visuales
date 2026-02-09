export default function PlaylistList({ songs }) {
  if (songs.length === 0) {
    return <p>No hay canciones aún 🎧</p>;
  }

  return (
    <ul className="list">
      {songs.map((song) => (
        <li key={song._id}>
          <strong>{song.titulo}</strong>
          <span>{song.artista}</span>
        </li>
      ))}
    </ul>
  );
}
