import Shell from './Shell';

export default class Terminal{

    constructor(id, logger, network){
        this.id = id;
        this.logger = logger;
        this.network = network;
        this.isOpen = false;
        this.isActive = false;
        this.connectedDevice = this.network.localhost;
        this.rootDirectory = this.connectedDevice.rootDirectory;
        this.currentDirectory = this.rootDirectory;
        this.activeTab = 'explorer'
        this.currentFile = null;
        this.filters = null;
        this.currentLocation = null;
        this.devices = null;
        this.shell = new Shell(this);
    }

    setView(view){
        this.view = view;
    }

    open(){
        this.logger.info("Initialising terminal...");
        setTimeout(() => {
            this.isOpen = true;
            this.logger.info("Terminal initialised");
            this.view.forceUpdate();
        }, 1000);
    }

    close(){
        this.isOpen = false;
        this.logger.info("Terminal session terminated");
    }

    activate(){
        this.isActive = true;
        this.shell.activate();
    }

    deactivate(){
        this.isActive = false;
    }

    changeDirectory(directory){
        this.currentDirectory = directory;
        this.changeTab("explorer");
        this.currentFile = null;
    }

    openFile(file){
        this.currentFile = file;
        if(file.isDatabase){
            this.changeTab("databaseViewer");
        }else{
            this.changeTab("fileViewer");
        }
    }

    closeFile(){
        if(!this.currentFile){
            return;
        }
        var parent = this.currentFile.parent;
        if(parent.isDirectory() && !parent.isDatabase){
            this.changeDirectory(parent);
        }else{
            this.openFile(parent);
        }
    }

    changeTab(tab){
        this.activeTab = tab;
        this.filters = null;
        this.currentLocation = null;
    }

    connect(ipAddress){
        this.logger.info("Connecting to " + ipAddress + "...");
        const device = this.network.getDeviceByIpAddress(ipAddress);
        if(!device){
            this.logger.warn("Device not found for IP: " + ipAddress);
            throw "Device not found for IP: " + ipAddress;
        }
        this.logger.info("Establishing connection...");
        this.logger.info("Running security analysis...")
        this.logger.info("Bypassing firewall...")
        this._connect(device);
        this.logger.info("Connection established");
    }

    _connect(device){
        this.connectedDevice = device;
        this.rootDirectory = this.connectedDevice.rootDirectory;
        this.currentDirectory = this.rootDirectory;
        this.shell.currentDirectory = this.currentDirectory;
        this.changeTab("explorer");
    }

    disconnect(){
        this.logger.info("Disconnecting...");
        this._connect(this.network.localhost);
        this.logger.info("Disconnected");
    }

    showAddress(number, areaCode){
        this.logger.info("Locating address...");
        const location = this.network.getLocation(number, areaCode);
        if(!location){
            this.logger.warn("Address not found");
            throw 'Address not found';
        }
        this.logger.info("Acquiring coordinates...");
        this.changeTab('map');
        this.devices = null;
        this.currentLocation = location;
        this.logger.info("Address located");
    }

    showDevices(){
        if(!this.currentLocation){
            throw "No location selected";
        }
        this.logger.info("Scanning location for devices...");
        this.devices = this.network.getDevicesAtLocation(this.currentLocation);
        if(this.devices.length == 0){
            this.logger.warn("No devices found");
            throw "No devices found";
        }
        this.logger.info(this.devices.length + " devices found");
    }

}