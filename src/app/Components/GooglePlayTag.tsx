import "./GooglePlayTag.css";

export function GooglePlayTag() {
    const appId = "com.milesjpool.whatthehex";
    return (
        <div className="google-play-tag flex">
            <a className="flex" href={`https://play.google.com/store/apps/details?id=${appId}`} target="_blank" rel="noopener noreferrer">
                <img src="/google-play-badge.png" alt="Google Play badge" />
            </a>
        </div>
    );
}
