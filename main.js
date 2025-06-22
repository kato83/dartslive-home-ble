const SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
/** 通知用 characteristic UUID */
const CHARACTERISTIC_UUID = '6e40fff6-b5a3-f393-e0a9-e50e24dcca9e';
/** 接続済みか */
let isConnected = false;
const scoreList = [];

const dat = new Map([
  [0x3c, { text: 'D20', number: 20 * 2 }],
  [0x28, { text: 'S20_O', number: 20 }],
  [0x50, { text: 'T20', number: 20 * 3 }],
  [0x14, { text: 'S20_I', number: 20 }],
  [0x29, { text: 'D1', number: 1 * 2 }],
  [0x15, { text: 'S1_O', number: 1 }],
  [0x3d, { text: 'T1', number: 1 * 3 }],
  [0x01, { text: 'S1_I', number: 1 }],
  [0x3a, { text: 'D18', number: 18 * 2 }],
  [0x26, { text: 'S18_O', number: 18 }],
  [0x4e, { text: 'T18', number: 18 * 3 }],
  [0x12, { text: 'S18_I', number: 18 }],
  [0x2c, { text: 'D4', number: 4 * 2 }],
  [0x18, { text: 'S4_O', number: 4 }],
  [0x40, { text: 'T4', number: 4 * 3 }],
  [0x04, { text: 'S4_I', number: 4 }],
  [0x35, { text: 'D13', number: 13 * 2 }],
  [0x21, { text: 'S13_O', number: 13 }],
  [0x49, { text: 'T13', number: 13 * 3 }],
  [0x0d, { text: 'S13_I', number: 13 }],
  [0x2e, { text: 'D6', number: 6 * 2 }],
  [0x1a, { text: 'S6_O', number: 6 }],
  [0x42, { text: 'T6', number: 6 * 3 }],
  [0x06, { text: 'S6_I', number: 6 }],
  [0x32, { text: 'D10', number: 10 * 2 }],
  [0x1e, { text: 'S10_O', number: 10 }],
  [0x46, { text: 'T10', number: 10 * 3 }],
  [0x0a, { text: 'S10_I', number: 10 }],
  [0x37, { text: 'D15', number: 15 * 2 }],
  [0x23, { text: 'S15_O', number: 15 }],
  [0x4b, { text: 'T15', number: 15 * 3 }],
  [0x0f, { text: 'S15_I', number: 15 }],
  [0x2a, { text: 'D2', number: 2 * 2 }],
  [0x16, { text: 'S2_O', number: 2 }],
  [0x3e, { text: 'T2', number: 2 * 3 }],
  [0x02, { text: 'S2_I', number: 2 }],
  [0x39, { text: 'D17', number: 17 * 2 }],
  [0x25, { text: 'S17_O', number: 17 }],
  [0x4d, { text: 'T17', number: 17 * 3 }],
  [0x11, { text: 'S17_I', number: 17 }],
  [0x2b, { text: 'D3', number: 3 * 2 }],
  [0x17, { text: 'S3_O', number: 3 }],
  [0x3f, { text: 'T3', number: 3 * 3 }],
  [0x03, { text: 'S3_I', number: 3 }],
  [0x3b, { text: 'D19', number: 19 * 2 }],
  [0x27, { text: 'S19_O', number: 19 }],
  [0x4f, { text: 'T19', number: 19 * 3 }],
  [0x13, { text: 'S19_I', number: 19 }],
  [0x2f, { text: 'D7', number: 7 * 2 }],
  [0x1b, { text: 'S7_O', number: 7 }],
  [0x43, { text: 'T7', number: 7 * 3 }],
  [0x07, { text: 'S7_I', number: 7 }],
  [0x38, { text: 'D16', number: 16 * 2 }],
  [0x24, { text: 'S16_O', number: 16 }],
  [0x4c, { text: 'T16', number: 16 * 3 }],
  [0x10, { text: 'S16_I', number: 16 }],
  [0x30, { text: 'D8', number: 8 * 2 }],
  [0x1c, { text: 'S8_O', number: 8 }],
  [0x44, { text: 'T8', number: 8 * 3 }],
  [0x08, { text: 'S8_I', number: 8 }],
  [0x33, { text: 'D11', number: 11 * 2 }],
  [0x1f, { text: 'S11_O', number: 11 }],
  [0x47, { text: 'T11', number: 11 * 3 }],
  [0x0b, { text: 'S11_I', number: 11 }],
  [0x36, { text: 'D14', number: 14 * 2 }],
  [0x22, { text: 'S14_O', number: 14 }],
  [0x4a, { text: 'T14', number: 14 * 3 }],
  [0x0e, { text: 'S14_I', number: 14 }],
  [0x31, { text: 'D9', number: 9 * 2 }],
  [0x1d, { text: 'S9_O', number: 9 }],
  [0x45, { text: 'T9', number: 9 * 3 }],
  [0x09, { text: 'S9_I', number: 9 }],
  [0x34, { text: 'D12', number: 12 * 2 }],
  [0x20, { text: 'S12_O', number: 12 }],
  [0x48, { text: 'T12', number: 12 * 3 }],
  [0x0c, { text: 'S12_I', number: 12 }],
  [0x2d, { text: 'D5', number: 5 * 2 }],
  [0x19, { text: 'S5_O', number: 5 }],
  [0x41, { text: 'T5', number: 5 * 3 }],
  [0x05, { text: 'S5_I', number: 5 }],
  [0x51, { text: 'BULL', number: 50 }],
  [0x52, { text: 'D-BULL', number: 50 }],
  [0x54, { text: 'CHANGE', number: null }],
]);

const connectToBLEDevice = async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
      optionalServices: [SERVICE_UUID]
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

    isConnected = true;

    // 通知を受け取る処理
    characteristic.addEventListener('characteristicvaluechanged', event => {
      const value = event.target.value;
      const byteArray = new Uint8Array(value.buffer);
      const key = byteArray[2];
      const msg = dat.get(key);
      scoreList.push(msg.number);
      document.querySelector('.main-score').textContent = scoreList.reduce((acc, current) => acc + current);
      document.querySelector('.player-score').textContent = scoreList.reduce((acc, current) => acc + current);
    });

    await characteristic.startNotifications();

    document.querySelector('.main-score').textContent = 'Connected!';
    setTimeout(() => {
      document.querySelector('.main-score').textContent = '0';
      document.querySelector('.player-score').textContent = '0';
    }, 1500);

  } catch (error) {
    console.error('BLE接続中にエラー:', error);
    document.querySelector('.main-score').textContent = 'Error!';
    isConnected = false;
  }
}

document.addEventListener('click', async (e) => {
  if (isConnected) return;
  await connectToBLEDevice();
});
