'use client';

import { IKImage } from "imagekitio-next";

export default function OptimizedImage({
    path,
    src,
    width,
    height,
    alt,
    className
}: {
    path?: string,
    src?: string,
    width?: number,
    height?: number,
    alt: string,
    className?: string
}) {
    const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

    return (
        <IKImage urlEndpoint={urlEndpoint} path={path ?? ""} src={src ?? ""} alt={alt} width={width} height={height} className={className} loading="lazy" />
    );
};
