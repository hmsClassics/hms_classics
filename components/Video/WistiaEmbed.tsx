'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface WistiaEmbedProps {
  videoId: string
  width?: string
  padding?: string
  responsive?: boolean
}

const useExternalScript = (src: string) => {
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript) {
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [src])
}

export default function WistiaEmbed({
  videoId,
  width = undefined, // Wistia's default is no width specified
  responsive = true,
  padding = '56.25% 0 0', // Wistia's default
}: WistiaEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useExternalScript(`https://fast.wistia.com/embed/medias/${videoId}.jsonp`)
  useExternalScript('https://fast.wistia.com/assets/external/E-v1.js')

  if (!responsive) {
    return (
      <div
        ref={containerRef}
        className={`wistia_embed wistia_async_${videoId}`}
        style={{
          height: '366px',
          width: '600px',
        }}>
        &nbsp;
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="wistia_responsive_padding"
      style={{
        padding: padding,
        position: 'relative',
        width: width,
      }}>
      <div
        className="wistia_responsive_wrapper"
        style={{
          position: 'absolute',
          height: '100%',
          left: 0,
          top: 0,
          width: '100%',
        }}>
        <div
          className={`wistia_embed wistia_async_${videoId} videoFoam=true`}
          style={{
            height: '100%',
            position: 'relative',
            width: '100%',
          }}>
          <div
            className="wistia_swatch"
            style={{
              height: '100%',
              left: 0,
              opacity: 0,
              overflow: 'hidden',
              position: 'absolute',
              top: 0,
              transition: 'opacity 200ms',
              width: '100%',
            }}>
            <Image
              src={`https://fast.wistia.com/embed/medias/${videoId}/swatch`}
              style={{
                filter: 'blur(5px)',
                height: '100%',
                objectFit: 'contain',
                width: '100%',
              }}
              width={100}
              height={66}
              alt=""
              aria-hidden="true"
              onLoad={(e) => {
                ;(e.target as any).parentNode.style.opacity = 1
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
