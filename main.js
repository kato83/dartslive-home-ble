const SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
/** 通知用 characteristic UUID */
const CHARACTERISTIC_UUID = '6e40fff6-b5a3-f393-e0a9-e50e24dcca9e';

const dat = new Map([
  [0x3c, "D20"],
  [0x28, "S20_O"],
  [0x50, "T20"],
  [0x14, "S20_I"],
  [0x29, "D1"],
  [0x15, "S1_O"],
  [0x3d, "T1"],
  [0x01, "S1_I"],
  [0x3a, "D18"],
  [0x26, "S18_O"],
  [0x4e, "T18"],
  [0x12, "S18_I"],
  [0x2c, "D4"],
  [0x18, "S4_O"],
  [0x40, "T4"],
  [0x04, "S4_I"],
  [0x35, "D13"],
  [0x21, "S13_O"],
  [0x49, "T13"],
  [0x0d, "S13_I"],
  [0x2e, "D6"],
  [0x1a, "S6_O"],
  [0x42, "T6"],
  [0x06, "S6_I"],
  [0x32, "D10"],
  [0x1e, "S10_O"],
  [0x46, "T10"],
  [0x0a, "S10_I"],
  [0x37, "D15"],
  [0x23, "S15_O"],
  [0x4b, "T15"],
  [0x0f, "S15_I"],
  [0x2a, "D2"],
  [0x16, "S2_O"],
  [0x3e, "T2"],
  [0x02, "S2_I"],
  [0x39, "D17"],
  [0x25, "S17_O"],
  [0x4d, "T17"],
  [0x11, "S17_I"],
  [0x2b, "D3"],
  [0x17, "S3_O"],
  [0x3f, "T3"],
  [0x03, "S3_I"],
  [0x3b, "D19"],
  [0x27, "S19_O"],
  [0x4f, "T19"],
  [0x13, "S19_I"],
  [0x2f, "D7"],
  [0x1b, "S7_O"],
  [0x43, "T7"],
  [0x07, "S7_I"],
  [0x38, "D16"],
  [0x24, "S16_O"],
  [0x4c, "T16"],
  [0x10, "S16_I"],
  [0x30, "D8"],
  [0x1c, "S8_O"],
  [0x44, "T8"],
  [0x08, "S8_I"],
  [0x33, "D11"],
  [0x1f, "S11_O"],
  [0x47, "T11"],
  [0x0b, "S11_I"],
  [0x36, "D14"],
  [0x22, "S14_O"],
  [0x4a, "T14"],
  [0x0e, "S14_I"],
  [0x31, "D9"],
  [0x1d, "S9_O"],
  [0x45, "T9"],
  [0x09, "S9_I"],
  [0x34, "D12"],
  [0x20, "S12_O"],
  [0x48, "T12"],
  [0x0c, "S12_I"],
  [0x2d, "D5"],
  [0x19, "S5_O"],
  [0x41, "T5"],
  [0x05, "S5_I"],
  [0x51, "BULL"],
  [0x52, "D-BULL"],
  [0x54, "CHANGE"]
]);

async function connectToBLEDevice() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
      optionalServices: [SERVICE_UUID]
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

    // 通知を受け取る処理
    characteristic.addEventListener('characteristicvaluechanged', event => {
      const value = event.target.value;
      const byteArray = new Uint8Array(value.buffer);
      const key = byteArray[2];  // Pythonでの data[2]
      const msg = dat.get(key) || `未定義コード: 0x${key.toString(16)}`;
      document.getElementById('message').innerHTML = `受信: ${msg}`;
    });

    await characteristic.startNotifications();
    document.getElementById('message').innerHTML = '通知受信を開始しました';

  } catch (error) {
    console.error('BLE接続中にエラー:', error);
    document.getElementById('message').innerHTML = 'エラーが発生しました';
  }
}

document.querySelector('#connect')
  .addEventListener('click', async (e) => await connectToBLEDevice());
