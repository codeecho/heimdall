import React from 'react';

const Map = ({location, devices}) => {
    return (
        <div class='map'>
            <div class='well location-description'>
                <p>{location.description}</p>
                <p>{location.number} {location.street}</p>
                <p>{location.areaCode}</p>
            </div>
            <Devices devices={devices} />
            <div class='map-pointer'/>
        </div>
    );
}

const Devices = ({devices}) => {
    if(!devices){
        return null;
    }
    return (<div class='well location-devices'>
        <p class="title">Devices in Range</p>
        {devices.map(device => <Device device={device} />)}
    </div>);
}

const Device = ({device}) => {
    return (
        <p>{device.ipAddress}: {device.name}</p>
    );
}

export default Map;