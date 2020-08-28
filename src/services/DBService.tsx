import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from 'capacitor-data-storage-sqlite';
const { CapacitorDataStorageSqlite, Device } = Plugins;

interface options {
  database?: string
  table?: string
  encrypted?: boolean
  mode?: string
}

class DBService {
  _store: any = {};
  _isService: boolean = false;
  _platform: string = "";
  /**
 * Plugin Initialization
 */
  async initPlugin() {
    const info = await Device.getInfo();
    this._platform = info.platform;
    if (this._platform === 'ios' || this._platform === 'android') {
      this._store = CapacitorDataStorageSqlite;
    } else {
      this._store = PluginsLibrary.CapacitorDataStorageSqlite;
    }
    this._isService = true;
    return;
  }

  isService() {
    return this._isService;
  }

  platform() {
    return this._platform;
  }
  /**
     * Open a Database
     * @param database string optional
     * @param table string optional
     * @param encrypted boolean optional 
     * @param mode string optional
     */


  async openStore(options: options): Promise<any> {
    if (this._isService) {
      const database = options.database || 'storage';
      const table = options.table || 'storage_table';
      const encrypted = options.encrypted || false;
      const mode = options.mode || 'no-encryption';
      const { result } = await this._store.openStore({ database, table, encrypted, mode })
      return result;
    } else {
      return Promise.resolve(false);
    }
  }

  /**
    * Create/Set a Table
    * @param table string
    */
  async setTable(table: string): Promise<any> {
    if (this._isService) {
      const { result, message } = await this._store.setTable({ table });
      return Promise.resolve([result, message]);
    } else {
      return Promise.resolve({ result: false, message: 'Service is not initalized' });
    }
  }
  /**
     * Set of Key
     * @param key string 
     * @param value string
     */
  async setItem(key: string, value: string) {
    console.log('set key', key);
    console.log('set value', value);
    if (this._isService && key.length > 0) {
      await this._store.set({ key, value })
        .catch((error: any) => console.log(error))
    }
  }

  /**
    * Get the Value for a given Key
    * @param key string 
    */
  async getItem(key: string) {
    if (this._isService && key.length > 0) {
      const { value } = await this._store.get({ key });
      return value;
    } else {
      return null;
    }

  }
  async isKey(key: string) {
    if (this._isService && key.length > 0) {
      const { result } = await this._store.isKey({ key });
      return result;
    } else {
      return null;
    }
  }
  async getAllKeys() {
    if (this._isService) {
      const { keys } = await this._store.keys();
      return keys;
    } else {
      return null;
    }
  }
  async getAllValues() {
    if (this._isService) {
      const { values } = await this._store.values();
      return values;
    } else {
      return null;
    }
  }
  async getAllKeysValues() {
    if (this._isService) {
      const { keysvalues } = await this._store.keysvalues();
      return keysvalues;
    } else {
      return null;
    }
  }
  async removeItem(key: string) {
    if (this._isService && key.length > 0) {
      const { result } = await this._store.remove({ key });
      return result;
    } else {
      return null;
    }
  }
  async clear() {
    if (this._isService) {
      const { result } = await this._store.clear();
      return result;
    } else {
      return null;
    }
  }
  async deleteStore(options: options) {
    const database = options.database || "storage";
    await this.initPlugin();
    if (this._isService) {
      const { result } = await this._store.deleteStore({ database });
      return result;
    }
    return null;
  }


}

export { DBService };
