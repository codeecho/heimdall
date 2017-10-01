import Network from '../model/Network';
import Device from '../model/device/Device';
import Directory from '../model/device/Directory';
import TextFile from '../model/device/TextFile';
import Database from '../model/device/Database';
import MailBox from '../model/device/MailBox';
import Conversation from '../model/device/Conversation';
import Message from '../model/device/Message';
import Location from '../model/Location';

export default class Demo{

    constructor(){
        const localhost = this.createLocalhost();
        const testLocation1 = new Location(1, 'Test Street', '12345', 'Test Residence', {});
        this.network = new Network(localhost, this.createDevices(testLocation1), [testLocation1]);
    }

    createLocalhost(){
        return new Device('127.0.0.1', 'localhost', new Directory('root', [
            new TextFile('file1.txt', 'This is text file number 1'),
            new Directory('dir1', [
                new TextFile('file2.txt', 'This is text file number 2')
            ]),
            new Database('test.db', ['name'], [
                new TextFile('file3.txt', 'This is text file number 3'),
                new TextFile('file4.txt', 'This is text file number 4')
            ]),
            new MailBox('email', [
                new Conversation('test1', [
                    new Message('Dave', new Date(), 'This is a test'),
                    new Message('Sam', new Date(), 'This is another test, but this time with a much longer message. Lets see what it looks like')
                ])
            ])
        ]));
    }

    createDevices(location1){
        return [new Device('192.168.0.1', 'This is a test PC', new Directory('root', [
           new TextFile('remoteFile1.txt', 'This is a remote file') 
        ]), location1)];
    }

}