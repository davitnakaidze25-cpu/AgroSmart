import { useState, useCallback, useEffect } from 'react';

const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const SENSOR_CHAR_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const RELAY_CHAR_UUID = "8b00ace7-eb0e-49b0-9b16-a18c64560667";

export function useAgroState() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [device, setDevice] = useState(null);
  const [relayCharacteristic, setRelayCharacteristic] = useState(null);

  const [sensors, setSensors] = useState({
    temp: '--',
    hum: '--',
    light: '--',
    mist: '0',
    pumpActive: '0'
  });

  const [relays, setRelays] = useState(['0', '0', '0', '0']);
  const [autoMode, setAutoMode] = useState(false);
  const [calibrations, setCalibrations] = useState({ dark: 0, bright: 100 });

  const disconnectBLE = useCallback(() => {
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
    }
  }, [device]);

  useEffect(() => {
    const onDisconnected = () => {
      setIsConnected(false);
      setRelayCharacteristic(null);
      setDevice(null);
    };

    if (device) {
      device.addEventListener('gattserverdisconnected', onDisconnected);
    }

    return () => {
      if (device) {
        device.removeEventListener('gattserverdisconnected', onDisconnected);
      }
    };
  }, [device]);

  const connectBLE = async () => {
    try {
      setIsConnecting(true);
      const bleDevice = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE_UUID] }]
      });

      const server = await bleDevice.gatt.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);

      const sensorChar = await service.getCharacteristic(SENSOR_CHAR_UUID);
      await sensorChar.startNotifications();
      sensorChar.addEventListener('characteristicvaluechanged', (event) => {
        const decoder = new TextDecoder('utf-8');
        const rawString = decoder.decode(event.target.value).trim();
        const dataParts = rawString.split(',').map((value) => value.trim());

        if (dataParts.length >= 4) {
          const pumpActive = dataParts[3] === '1' ? '1' : '0';

          setSensors({
            temp: parseFloat(dataParts[0]).toFixed(1),
            hum: parseFloat(dataParts[1]).toFixed(1),
            light: parseInt(dataParts[2], 10).toString(),
            pumpActive,
            mist: pumpActive
          });
        }
      });

      const relayChar = await service.getCharacteristic(RELAY_CHAR_UUID);
      setRelayCharacteristic(relayChar);

      setDevice(bleDevice);
      setIsConnected(true);
    } catch (error) {
      console.error('BLE Error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const toggleRelay = useCallback(async (index) => {
    if (index < 0 || index >= relays.length) {
      console.error('Invalid relay index:', index);
      return;
    }

    const newStates = [...relays];
    newStates[index] = newStates[index] === '1' ? '0' : '1';
    setRelays(newStates);

    if (relayCharacteristic) {
      try {
        const payloadStr = newStates.join('');
        const encoder = new TextEncoder();
        await relayCharacteristic.writeValue(encoder.encode(payloadStr));
      } catch (err) {
        console.error('Relay write failed:', err);
      }
    }
  }, [relays, relayCharacteristic]);

  return {
    isConnected,
    isConnecting,
    sensors,
    relays,
    autoMode,
    setAutoMode,
    calibrations,
    setCalibrations,
    connectBLE,
    disconnectBLE,
    toggleRelay
  };
}
