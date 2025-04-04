import { ChatStorageService } from "../service/ChatStorageService";
import { useEffect, useState } from "react";

interface DisplayMessageMediaProps {
  media?: { url: string; type: string };
}

export const DisplayMessageMedia = ({ media }: DisplayMessageMediaProps) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!media) return;

    ChatStorageService.getMediaBlob(media.url).then((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      }
    });
  }, [media]);

  if (!media || !blobUrl) return null;

  if (media.type.startsWith("image")) {
    return <img src={blobUrl} alt="media" style={{ maxWidth: "100%" }} />;
  }

  if (media.type.startsWith("video")) {
    return <video src={blobUrl} controls style={{ maxWidth: "100%" }} />;
  }

  return null;
};
