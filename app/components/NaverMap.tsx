'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

const MAPID = 'naver-map';
const COORDINATES = [37.6689999, 127.2084842];

function NaverMap() {
  const mapRef = useRef<naver.maps.Map>();
  const markerRef = useRef<naver.maps.Marker>();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded) {
      return;
    }

    const position = new window.naver.maps.LatLng(
      COORDINATES[0],
      COORDINATES[1]
    );

    const mapOptions = {
      center: position,
      zoom: 19,
      scaleControl: true,
      mapDataControl: true,
      logoControlOptions: {
        position: window.naver.maps.Position.BOTTOM_LEFT,
      },
    };

    if (!mapRef.current) {
      mapRef.current = new window.naver.maps.Map(MAPID, mapOptions);
    }
    if (!markerRef.current) {
      // 마커 추가
      markerRef.current = new window.naver.maps.Marker({
        position: position,
        map: mapRef.current,
      });
    }

    mapRef.current.setCenter(position);
    markerRef.current.setPosition(position);
  }, [scriptLoaded]);

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_ID}&submodules=geocoder`}
        onLoad={() => setScriptLoaded(true)}
      />
      <div id={MAPID} style={{ width: '100%', height: '400px' }}></div>
    </>
  );
}

export default NaverMap;
