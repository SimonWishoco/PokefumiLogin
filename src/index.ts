
import {app} from './app'
import {AddressInfo} from 'net'
const server = app.listen(5000, 'pokefumi', () => {
    const {port, address} = server.address() as AddressInfo;
    console.log('Server listening on:','http://' + address + ':'+port);
});
