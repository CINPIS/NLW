import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';
/* npm install @types/react-leaflet */

import 'leaflet/dist/leaflet.css';

import '../styles/pages/orphanages-map.css';

import mapMarkerLogo from '../images/Local.svg';

function OrphanagesMaps(){
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerLogo} alt="Happy Location"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita! :)</p>
                </header>

                <footer>
                    <strong>Florianópolis</strong>
                    <span>Santa Catarina</span>
                </footer>
            </aside>

            <Map
                center={[-27.6160019,-48.5943699]}
                zoom={12}
                style={{ width:'100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    
    );
}

export default OrphanagesMaps;