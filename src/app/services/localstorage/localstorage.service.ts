import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })

export class LocalStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init() {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
  }

  async set(key: string, value: any) {
    await this.ensureStorageReady();
    await this._storage?.set(key, value);
  }

  async get(key: string) {
    await this.ensureStorageReady();
    return await this._storage?.get(key);
  }

  async remove(key: string) {
    await this.ensureStorageReady();
    await this._storage?.remove(key);
  }

  async clear() {
    await this.ensureStorageReady();
    await this._storage?.clear();
  }

  private async ensureStorageReady(): Promise<void> {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
  }

}
