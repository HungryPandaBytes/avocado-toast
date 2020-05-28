import { Plugins } from '@capacitor/core';
import * as PluginsLibrary from 'capacitor-data-storage-sqlite';
const { CapacitorDataStorageSqlite, Device } = Plugins;

interface options {
  database?: string
  table?: string
  encrypted?: boolean
  mode?: string
}

class StoreService {
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
    console.log('key', key);
    console.log('value', value);
    if (this.isService && key.length > 0) {
      await this._store.set({ key, value });
    }
  }

  /**
    * Get the Value for a given Key
    * @param key string 
    */
  async isKey(key: string) {
    if (this._isService && key.length > 0) {
      const { result } = await this._store.isKey({ key });
      return result;
    } else {
      return null;
    }
  }

  async deleteStore(options: options) {
    const database = options.database || "storage";
    await this.initPlugin();
    if (this.isService) {
      const { result } = await this._store.deleteStore({ database });
      return result;
    }
    return null;
  }


}

export { StoreService };
