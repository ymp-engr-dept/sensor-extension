(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('この拡張はTurboWarp専用です。');
  }

  class SensorExtension {
    constructor() {
      this.latitude = 0;
      this.longitude = 0;
      this.altitude = 0;
      this.heading = 0;
      this.pitch = 0;
      this.roll = 0;
      this.gpsEnabled = false;

      window.addEventListener('deviceorientation', (event) => {
        this.heading = event.alpha ?? 0;
        this.pitch = event.beta ?? 0;
        this.roll = event.gamma ?? 0;
      }, true);
    }

    getInfo() {
      return {
        id: 'sensorExtension',
        name: 'センサー',
        color1: '#4B9CD3',
        color2: '#3676A3',
        blocks: [
          {
            opcode: 'enableGPS',
            blockType: Scratch.BlockType.COMMAND,
            text: 'GPSを有効にする'
          },
          {
            opcode: 'getLatitude',
            blockType: Scratch.BlockType.REPORTER,
            text: '緯度'
          },
          {
            opcode: 'getLongitude',
            blockType: Scratch.BlockType.REPORTER,
            text: '経度'
          },
          {
            opcode: 'getAltitude',
            blockType: Scratch.BlockType.REPORTER,
            text: '高度 [m]'
          },
          {
            opcode: 'getHeading',
            blockType: Scratch.BlockType.REPORTER,
            text: '方位 [°]'
          },
          {
            opcode: 'getPitch',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ピッチ [°]'
          },
          {
            opcode: 'getRoll',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ロール [°]'
          }
        ]
      };
    }

    enableGPS() {
      if (!this.gpsEnabled && navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            this.latitude = position.coords.latitude ?? 0;
            this.longitude = position.coords.longitude ?? 0;
            this.altitude = position.coords.altitude ?? 0;
          },
          (error) => {
            console.error('GPS取得失敗:', error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 1000
          }
        );
        this.gpsEnabled = true;
      }
    }

    getLatitude() {
      return Number(this.latitude.toFixed(6));
    }

    getLongitude() {
      return Number(this.longitude.toFixed(6));
    }

    getAltitude() {
      return Math.round(this.altitude * 100) / 100;
    }

    getHeading() {
      return Math.round(this.heading * 10) / 10;
    }

    getPitch() {
      return Math.round(this.pitch * 10) / 10;
    }

    getRoll() {
      return Math.round(this.roll * 10) / 10;
    }
  }

  Scratch.extensions.register(new SensorExtension());
})(Scratch);
