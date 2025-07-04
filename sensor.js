(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('この拡張機能はTurboWarp専用です。Scratchでは動きません。');
  }

  class SensorExtension {
    constructor() {
      this.latitude = 0;
      this.longitude = 0;
      this.altitude = 0;
      this.pitch = 0;
      this.roll = 0;
      this.heading = 0;

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
          this.latitude = position.coords.latitude || 0;
          this.longitude = position.coords.longitude || 0;
          this.altitude = position.coords.altitude || 0;
        }, error => {
          console.error('GPS取得失敗:', error);
        }, {
          enableHighAccuracy: true,
          maximumAge: 1000
        });
      } else {
        console.warn('このデバイスはGPSに対応していません');
      }

      window.addEventListener('deviceorientation', (event) => {
        this.pitch = event.beta || 0;
        this.roll = event.gamma || 0;
        this.heading = event.alpha || 0;
      }, true);
    }

    getInfo() {
      return {
        id: 'sensorExtension',
        name: 'センサー',
        blocks: [
          { opcode: 'getLatitude', blockType: Scratch.BlockType.REPORTER, text: '緯度' },
          { opcode: 'getLongitude', blockType: Scratch.BlockType.REPORTER, text: '経度' },
          { opcode: 'getAltitude', blockType: Scratch.BlockType.REPORTER, text: '高度' },
          { opcode: 'getHeading', blockType: Scratch.BlockType.REPORTER, text: '方位' },
          { opcode: 'getPitch', blockType: Scratch.BlockType.REPORTER, text: 'ピッチ' },
          { opcode: 'getRoll', blockType: Scratch.BlockType.REPORTER, text: 'ロール' },
        ]
      };
    }

    getLatitude() { return this.latitude; }
    getLongitude() { return this.longitude; }
    getAltitude() { return this.altitude; }
    getHeading() { return this.heading; }
    getPitch() { return this.pitch; }
    getRoll() { return this.roll; }
  }

  Scratch.extensions.register(new SensorExtension());
})(Scratch);
