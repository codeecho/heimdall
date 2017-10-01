export default class Network{

    constructor(localhost, devices, locations){
        this.localhost = localhost;
        this.devices = devices;
        this.locations = locations;
    }

    getDeviceByIpAddress(ipAddress){
        return this.devices.find(device => device.ipAddress == ipAddress);
    }

    getDevicesAtLocation(location){
        return this.devices.filter(device => device.location == location);
    }

    getLocation(number, areaCode){
        return this.locations.find(location => location.number = number && location.areaCode == areaCode);
    }

}