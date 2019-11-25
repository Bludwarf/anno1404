import {arrayToMap} from '../utils';
import * as config from '../../assets/anno1404.config.json';
import {Building} from '../builing/building';

export interface Consumption {
  Fish?: number;
  Cider?: number;
  Spice?: number;
  'Linen Garments'?: number;
}

export class People {

  private consumptionRatiosCache: Consumption;

  public constructor(public id: string, public name = 'name', public resName = 'resName') {
  }

  // Formula : consKgPer100PerMin / 100 000 / prodTonsPerMin
  // Comments : values from anno1404-rechner.de
  get consumptionRatios(): Consumption {
    if (this.consumptionRatiosCache === undefined) {
      this.consumptionRatiosCache = People.getConsumptionFromJSON(this.id);
    }
    return this.consumptionRatiosCache;
  }

  public count = 0;

  static getConsumptionFromJSON(peopleName: string) {
    const people = config.peoples[peopleName];
    if (!people) {
      throw new Error('People not found : ' + peopleName);
    }

    const consumption = arrayToMap(config.resourceNames,
      resourceName => resourceName,
      resourceName => {
        const consKgPer100PerMin = people[resourceName];
        if (!consKgPer100PerMin) {
          return 0;
        }
        const prodBuilding = Building.get(Building.getBuildingNameProducing(resourceName));
        return getConsumptionRatios(consKgPer100PerMin, prodBuilding.tpm);
      });
    console.log('Consumption for ' + peopleName, consumption);
    return consumption;
  }

  getConsumption(resource: string, peoples: Peoples): number {
    const resourceConsumptionCondition = config.resourceConsumptionConditions[resource];
    if (resourceConsumptionCondition && peoples[resourceConsumptionCondition.people].count < resourceConsumptionCondition.count) {
      return 0;
    }

    const consumptionRatio = this.consumptionRatios[resource];
    if (!consumptionRatio) {
      return 0;
    }
    return consumptionRatio * this.count;
  }

  get image(): string {
    return `assets/images/${this.id}.png`;
  }
}

export class Peoples {
  public Beggars = new People('Beggars', 'Mendiants', 'Bettler');
  public Peasants = new People('Peasants', 'Paysans', 'Bauer');
  public Citizens = new People('Citizens', 'Citoyens', 'Buerger');
  public Patricians = new People('Patricians', 'Patriciens', 'Patrizier');
  public Noblemen = new People('Noblemen', 'Nobles', 'Adlige');
  public Nomads = new People('Nomads', 'Nomades', 'Normaden');
  public Envoys = new People('Envoys', 'Émissaires', 'Gesandte');

  toArray(): People[] {
    return [
      this.Beggars,
      this.Peasants,
      this.Citizens,
      this.Patricians,
      this.Noblemen,
      this.Nomads,
      this.Envoys
    ];
  }

  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element
   * in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as
   * the this value.
   */
  map<U>(callbackfn: (value: People, index: number, array: People[]) => U, thisArg?: any): U[] {
    return this.toArray().map(callbackfn, thisArg);
  }

  reset() {
    const peopleNames = Object.keys(config.peoples);
    peopleNames.forEach(peopleName => this[peopleName].count = 0);
  }
}

function getConsumptionRatios(consKgPer100PerMin: number, prodTonsPerMin: number) {
  if (!consKgPer100PerMin) {
    return 0;
  }
  return consKgPer100PerMin / 100000 / prodTonsPerMin;
}

