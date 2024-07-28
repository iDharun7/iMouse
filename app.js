// app.js

let device = null;

async function connectToDevice() {
    try {
        device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['battery_service']  // Update this to the actual service you need
        });
        const server = await device.gatt.connect();
        console.log('Connected to device:', device);
        document.getElementById('status').textContent = 'Connected to ' + device.name;
        
        // You can add more logic here to interact with the device
        // For example, getting the battery level if your device has a battery service
        const service = await server.getPrimaryService('battery_service');
        const characteristic = await service.getCharacteristic('battery_level');
        const batteryLevel = await characteristic.readValue();
        console.log('Battery level:', batteryLevel.getUint8(0) + '%');
    } catch (error) {
        console.error('Connection failed:', error);
        document.getElementById('status').textContent = 'Connection failed: ' + error;
    }
}

function sendMouseAction(action) {
    console.log(action);
    // Here you would send the action to the connected device
    // For now, we'll just log it to the console
}

document.getElementById('connect').addEventListener('click', connectToDevice);
document.getElementById('left-click').addEventListener('click', () => sendMouseAction('Left click'));
document.getElementById('right-click').addEventListener('click', () => sendMouseAction('Right click'));
document.getElementById('scroll-up').addEventListener('click', () => sendMouseAction('Scroll up'));
document.getElementById('scroll-down').addEventListener('click', () => sendMouseAction('Scroll down'));
