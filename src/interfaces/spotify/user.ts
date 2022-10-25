export interface User {
    displayName: string;
    imageUrl: string;
    topTracks: Track[];
    topArtists: Artist[];
}

export interface Track {
    id: string;
    name: string;
}

export interface Artist {
    id: string;
    name: string;
}
