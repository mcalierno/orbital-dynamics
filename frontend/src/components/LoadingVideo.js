import { useRef } from 'react';
import './LoadingVideo.css';

export default function LoadingVideo({ loading, rowValues }) {
    const videoRef = useRef(null);

    // Change playback speed based on numRows - more will take longer to process
    const numRowsToSpeedMap = {
        1 : 5,
        2:  3.25,
        3:  2,
        4:  1.75,
        5:  1.25,
    }

    return (
        <>
            {loading && (
                <div className="loading-video-container">
                    <video
                        ref={videoRef}
                        src="/loading.mov"
                        autoPlay
                        width="720"
                        height="540"
                        className="loading-video"
                        onLoadedMetadata={() => {
                            if (videoRef.current) {
                                videoRef.current.playbackRate = numRowsToSpeedMap[rowValues.length]
                            }
                        }}
                    />
                </div>)}
        </>
    )
};