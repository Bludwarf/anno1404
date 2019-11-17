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

  getConsumption(resource: string): number {
    const consumptionRatio = this.consumptionRatios[resource];
    if (!consumptionRatio) {
      return 0;
    }
    return consumptionRatio * this.count;
  }

  get image(): string {
    return `/assets/images/${this.id}.png`;
  }
}

function getConsumptionRatios(consKgPer100PerMin: number, prodTonsPerMin: number) {
  if (!consKgPer100PerMin) {
    return 0;
  }
  return consKgPer100PerMin / 100000 / prodTonsPerMin;
}

