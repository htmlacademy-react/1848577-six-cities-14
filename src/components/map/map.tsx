import {useRef, useEffect} from 'react';
import {Marker, layerGroup, Icon} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {OfferPreview, Location, Offer} from '../../types/types';
import useMap from '../../hooks/use-map';

type MapProps = {
  page: 'cities' | 'offer';
  city: Offer['city'];
  offers: OfferPreview[];
  location: Location;
  activeOfferId?: OfferPreview['id'] | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 40]
});

function Map({page, city, offers, location, activeOfferId}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if(map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city.location]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            activeOfferId !== null && offer.id === activeOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeOfferId]);

  return (
    <section className={`${page}__map map`} ref={mapRef}></section>
  );
}

export default Map;
