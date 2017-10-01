import Josh from 'josh.js';

export default class Shell{

    constructor(terminal){
        this.terminal = terminal;
        this.id = terminal.id;
        this.templates = {};
        this.templates.not_found = _.template('<div><%=cmd%>: <%=path%>: No such file or directory</div>');
        this.templates.is_a_directory = _.template('<div><%=cmd%>: <%=path%> is a directory</div>');
        this.templates.general_error = _.template('<div><%=cmd%>: <%=message%></div>');
    }

    initialise(view){
        const id = this.id;
        this.joshShell = Josh.Shell({'shell_panel_id': 'shell-panel' + id, 'shell_view_id': 'shell-view' + id, 'input_id': 'shell-cli' + id});
        this.joshShell.onNewPrompt(function(callback) {
            callback('root@localhost $');
        });
        this.joshPathHandler = new Josh.PathHandler(this.joshShell);
        this.joshPathHandler.current = this.terminal.rootDirectory;
        this.joshPathHandler.getNode = (path, callback) => {
            if(!path) {
                return callback(this.joshPathHandler.current);
            }
            const currentFile = this.terminal.currentFile;
            if(currentFile && currentFile.isDatabase){
                callback(currentFile.children.find((child) => child.name = path));
                return;
            }
            var parts = path.split('/').filter(function(x) {
                return x;
            });
            var start = ((path || '')[0] == '/') ? this.terminal.rootDirectory : this.joshPathHandler.current;
            return findNode(start, parts, callback);
        };
        this.joshPathHandler.getChildNodes = (node, callback) => {
            const currentFile = this.terminal.currentFile;
            if(currentFile && currentFile.isDatabase){
                callback(currentFile.getFilteredChildren(this.terminal.filters))
            }else{
                callback(node.children);
            }
        };
        this.joshPathHandler.isDirectory = (node, callback) => {
            callback(node.isDirectory() && !node.isDatabase);
        }
        this.joshPathHandler.onChangeDirectory = (node) => {
            view.props.changeDirectory(node);
        }
        this.joshShell.setCommandHandler('open', {
            exec: (cmd, args, callback) => {
                this.joshPathHandler.getNode(args[0], (node) => {
                    if(!node) {
                        return callback(this.templates.not_found({cmd: 'open', path: args[0]}));
                    }
                    this.joshPathHandler.isDirectory(node, (isDirectory) => {
                        if(!isDirectory){
                            view.props.openFile(node);
                            return callback();
                        }else{
                            return callback(this.templates.is_a_directory({cmd: 'open', path: args[0]}));
                        }
                    });
                });
            },
            completion: this.joshPathHandler.pathCompletionHandler
        });
        this.addCommandHandler('close', (cmd, args) => {
            view.props.closeFile()
        });
        this.addCommandHandler('exit', (cmd, args) => {
            view.props.close()
        });
        this.addCommandHandler('filter', (cmd, args) => {
            view.props.filter(args)
        });
        this.addCommandHandler('connect', (cmd, args) => {
            if(args == null || args.length < 1){
                throw "No IP specified";
            }
            const ipAddress = args[0];
            view.props.connect(ipAddress);
        });
        this.addCommandHandler('disconnect', (cmd, args) => {
            view.props.disconnect();
        });
        this.addCommandHandler('locate-address', (cmd, args) => {
            if(args == null || args.length < 2){
                throw "Number and/or street not specified";
            }
            view.props.locateAddress(args[0], args[1]);
        });
        this.addCommandHandler('scan-location', (cmd, args) => {
            view.props.scanLocation();
        });
        function findNode(current, parts, callback) {
            if(!parts || parts.length == 0) {
                return callback(current);
            }
            if(parts[0] == '.') {
            } else if(parts[0] == '..') {
                current = current.parent;
            } else {
                current = current.children.filter(function(node) {
                    return node.name == parts[0];
                })[0];
            }
            if(!current) {
                return callback();
            }
            return findNode(current, _.rest(parts), callback);
        }
    }

    activate(){
        this.joshShell.activate();
    }

    addCommandHandler(alias, handler){
        this.joshShell.setCommandHandler(alias, {
            exec: (cmd, args, callback) => {
                try{
                    const message = handler(cmd, args);
                    callback(message);
                }catch(err){
                    throw err;
                    //return callback(this.templates.general_error({cmd: cmd, message: err}));
                }
            }
        });
    }

    set currentDirectory(currentDirectory){
        this.joshPathHandler.current = currentDirectory;
    }

}