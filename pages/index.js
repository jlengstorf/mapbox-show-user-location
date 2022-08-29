import 'mapbox-gl/dist/mapbox-gl.css';

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import mapboxgl from 'mapbox-gl';
import { getLocationDetails } from '../utils/get-location-details';

import styles from '../styles/Home.module.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export async function getStaticProps() {
  const location = await getLocationDetails(
    'Whitefish, MT, US',
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  );

  return {
    props: {
      heading: 'The best headlines around!',
      details: 'This response is static.',
      location,
    },
  };
}

export default function Home({ heading, details, location }) {
  const ref = useRef();

  useEffect(() => {
    if (!location) {
      return;
    }

    const mbMap = new mapboxgl.Map({
      container: ref.current.id,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: location.center,
      zoom: 5,
    });

    new mapboxgl.Marker().setLngLat(location.geometry.coordinates).addTo(mbMap);
  }, [location]);

  return (
    <div className={styles.container}>
      <Head>
        <title id="title">{heading}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 id="heading">{heading}</h1>

        <div ref={ref} id="map" className={styles.map} />

        <p>
          Update and replace content in Next.js and avoid React hydration
          errors. <span className="details">{details}</span>
        </p>
      </main>
    </div>
  );
}
